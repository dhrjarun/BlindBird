import { Request, Response } from 'express'
import config from 'config'

export const logout = (req: Request, res: Response): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    req.logout((err) => {
      if (err) {
        reject(false)
      } else {
        req.session.destroy((err) => {
          if (err) {
            reject(false)
          } else {
            res.clearCookie(config.get<string>('session_name'))
            resolve(true)
          }
        })
      }
    })
  })
}
