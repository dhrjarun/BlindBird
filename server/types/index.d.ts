import { Request, Response } from 'express'
import { PubSub } from 'graphql-subscriptions'

declare global {
  export interface MyCtx {
    req: Request
    res: Response
    pubsub: PubSub
  }
}
