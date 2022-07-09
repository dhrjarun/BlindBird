import { Request, Response } from 'express'

declare global {
  export interface MyCtx {
    req: Request
    res: Response
  }
}
