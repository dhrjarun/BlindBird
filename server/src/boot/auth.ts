import passport from 'passport'
import passportTwitter from 'passport-twitter'
import User from '../entity/User'
import config from 'config'
import dataSource from '../data-source'

const Strategy = passportTwitter.Strategy

export default () => {
  passport.use(
    new Strategy(
      {
        consumerKey: process.env.TWT_API_KEY as string,
        consumerSecret: process.env.TWT_API_KEY_SECRET as string,
        callbackURL: config.get('twt_callback_url'),
      },
      async (token, tokenSecret, profile, cb) => {
        const { id } = profile

        let user

        try {
          user = await User.findOne({ where: { tId: id } })
          if (!user) {
            user = await User.create({ tId: id }).save()
          }
        } catch (err) {
          cb(err)
        }
        cb(null, { id: user?.id, tId: user?.tId })
      },
    ),
  )
  passport.serializeUser(function (user, cb) {
    cb(null, user)
  })
  passport.deserializeUser(function (user: any, cb) {
    cb(null, user)
  })
}
