import express from 'express'
import passport from 'passport'
import config from 'config'

const router = express.Router()

router.get(
  '/auth/twitter',
  (req, res, next) => {
    ;(req.session as any).continueUrl = req.query.continueUrl
    console.log('session log 1', (req.session as any).continueUrl)
    next()
  },
  passport.authenticate('twitter'),
)

router.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', {
    failureRedirect: config.get<string>('twt_failed_url'),
    // successRedirect: config.get<string>('twt_success_url'),
  }),
  (req, res) => {
    const redirectUrl =
      (req.session as any).continueUrl || config.get<string>('twt_success_url')

    ;(req.session as any).continueUrl = ''
    res.redirect(redirectUrl)
  },
)

router.get('/check-user', function (req, res) {
  res.send(req.user)
})

router.get('/logout', function (req, res) {
  req.logout((err) => {
    if (err) {
      res.send(false)
    } else {
      res.clearCookie('userId')
      res.send(true)
    }
  })
})

export default router
