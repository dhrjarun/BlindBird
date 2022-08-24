import 'express'

declare global {
  namespace Express {
    export interface User {
      id: number
      tId: string
    }
    interface Request {
      user?: User | undefined
    }
  }
}
