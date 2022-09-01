import './boot/env'
import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageProductionDefault,
  ApolloServerPluginLandingPageLocalDefault,
  AuthenticationError,
  ApolloError,
} from 'apollo-server-core'
import { buildSchema } from 'type-graphql'
import express from 'express'
import session from 'express-session'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import config from 'config'
import { AuthChecker } from 'type-graphql'
import http from 'http'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { WebSocketServer } from 'ws'
import { Extra, useServer } from 'graphql-ws/lib/use/ws'
import connectRedis from 'connect-redis'
import { pubsub } from './pubsub'

import authBoot from './boot/auth'
import dbBoot from './boot/db'
import redisBoot from './boot/redis'
import { redis } from './redis'

import { authRouter, UserResolver } from './modules/user'
import { HelloWorldResolver } from './modules/hello-world/'
import { MessageResolver } from './modules/message'
import { ChatResolver } from './modules/chat'

import cors from 'cors'
import { Context, SubscribeMessage } from 'graphql-ws'
import { ExecutionArgs } from 'graphql'

export const authChecker: AuthChecker<MyCtx> = async (
  { root, args, context, info },
  roles,
) => {
  if (!context.req.user) return false

  if (roles[0] === 'firstPerson') {
    return root?.firstPerson.id === context.req.user.id
  }

  return true
}

async function main() {
  authBoot()
  dbBoot()
  redisBoot()

  const RedisStore = connectRedis(session)
  const sessionParser = session({
    store: new RedisStore({ client: redis }),
    name: config.get<string>('session_name'),
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      maxAge: 1000 * 60 * 60 * 24 * 365 * 7, // 7 years
    },
  })

  const app = express()
  const httpServer = http.createServer(app)

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      exposedHeaders: ['set-cookies', 'connection'],
    }),
  )

  const schema = await buildSchema({
    resolvers: [
      HelloWorldResolver,
      UserResolver,
      MessageResolver,
      ChatResolver,
    ],
    // emitSchemaFile: resolve(__dirname, 'schema/schema.gql'),
    emitSchemaFile: true,
    authChecker,
    authMode: 'null',
  })

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res, pubsub }),
    plugins: [
      // proper shutdown for http server
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // proper shutdown for websocket server

      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageProductionDefault({
            embed: true,
            graphRef: 'plaid-gufzoj@current',
          })
        : ApolloServerPluginLandingPageLocalDefault({ embed: true }),

      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
    formatError: (err) => {
      if (err.originalError instanceof ApolloError) return err

      return new ApolloError(
        'Something unexpected happened',
        'INTERNAL_SERVER_ERROR',
      )
    },
    csrfPrevention: true,
  })

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  })

  const getDynamicContext = (
    ctx: Context<
      Record<string, unknown> | undefined,
      Extra & Partial<Record<PropertyKey, never>>
    >,
    msg: SubscribeMessage,
    args: ExecutionArgs,
  ) => {
    const req = ctx.extra.request as express.Request
    const res = {} as any as express.Response

    type User = { tId: string; id: number }

    return new Promise((resolve, reject) => {
      sessionParser(req, res, () => {
        const session = req.session as any
        const user: User | null = session.passport?.user

        if (!user) return resolve({ user: null })
        resolve({ user })
      })
    })
  }

  const serverCleanup = useServer(
    {
      schema,
      context: async (ctx, msg, args) => {
        return await getDynamicContext(ctx, msg, args)
      },
    },
    wsServer,
  )

  app.set('trust proxy', process.env.NODE_ENV !== 'production') // because cookie is not getting stored in the browser

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())

  app.use(sessionParser)

  app.use(passport.initialize())
  app.use(passport.session())

  app.use('/', authRouter)

  await apolloServer.start()
  apolloServer.applyMiddleware({
    app,
    path: '/graphql',
    cors: false,
  })

  const port = process.env.PORT || 4200
  httpServer.listen({ port }, () => console.log(`listening on port ${port}`))
}

main()
