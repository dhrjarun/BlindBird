import express from 'express'
import passport from 'passport'
import config from 'config'

const router = express.Router()

router.get('/auth/twitter', passport.authenticate('twitter'))

router.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', {
    failureRedirect: config.get<string>('twt_failed_url'),
    successRedirect: config.get<string>('twt_success_url'),
  }),
)

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
