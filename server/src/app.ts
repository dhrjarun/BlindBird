import './boot/env'
import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import express from 'express'
import session from 'express-session'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import config from 'config'

import authBoot from './boot/auth'
import dbBoot from './boot/db'
import redisBoot from './boot/redis'
import { redis } from './redis'

import { authRouter, LogoutResolver } from './modules/user'
import { HelloWorldResolver } from './modules/hello-world/'

async function main() {
  authBoot()
  dbBoot()
  const RedisStore = redisBoot()

  const app = express()
  const schema = await buildSchema({
    resolvers: [
      HelloWorldResolver,
      LogoutResolver,
    ],
  })
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  })

  app.set('trust proxy', process.env.NODE_ENV !== 'production') // because cookie is not getting stored in the browser

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())

  app.use(
    session({
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
    }),
  )

  // app.use(
  //   session({
  //     secret: 'keyboard cat',
  //     name: 'userId',
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie: {
  //       secure: false,
  //       sameSite: 'lax',
  //     },
  //   }),
  // )
  app.use(passport.initialize())
  app.use(passport.session())
  app.use('/', authRouter)

  await apolloServer.start()
  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: [
        'https://studio.apollographql.com',
        'https://localhost:4200',
        'http://127.0.0.1:4200',
      ],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      exposedHeaders: ['set-cookies', 'connection'],
    },
  })
  const port = process.env.PORT || 4200
  app.listen({ port }, () => console.log(`listening on port ${port}`))
}

main()
