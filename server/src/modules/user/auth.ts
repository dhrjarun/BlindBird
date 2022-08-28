import express from 'express'
import passport from 'passport'
import config from 'config'
import { logout } from './logout'

const router = express.Router()

router.get(
  '/auth/twitter',
  (req, res, next) => {
    ;(req.session as any).continueUrl = req.query.continueUrl
    next()
  },
  passport.authenticate('twitter'),
)

router.get(
  '/auth/twitter/callback',
  (req, res, next) => {
    ;(req as any).continueUrl = (req.session as any).continueUrl
    next()
  },
  passport.authenticate('twitter', {
    failureRedirect: config.get<string>('twt_failed_url'),
  }),
  (req, res) => {
    const redirectUrl =
      (req as any).continueUrl || config.get<string>('twt_success_url')

    res.redirect(redirectUrl)
  },
)

router.get('/check-user', function (req, res) {
  res.send(req.user)
})

router.post('/logout', function (req, res) {
  logout(req, res).finally(() => res.redirect('/'))
})

export default router
