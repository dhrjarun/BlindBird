import passport from 'passport'
import passportTwitter from 'passport-twitter'
import User from '../entity/User'
import config from 'config'

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
        const { displayName, username, photos, emails } = profile
        let email: string | undefined
        let photo: string | undefined
        if (emails) email = emails[0].value
        if (photos) photo = photos[0].value

        let user

        try {
          user = await User.findOne({ where: { username } })
          if (!user) {
            user = await User.create({
              name: displayName,
              username,
              email,
              photo,
            }).save()
          }
        } catch (err) {
          cb(err)
        }
        cb(null, { id: user?.id, username: user?.username })
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
