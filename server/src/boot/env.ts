import dotenv from 'dotenv'
dotenv.config()

const requiredEnv: string[] = [
  'NODE_ENV',
  'SESSION_SECRET',
  'DB_HOST',
  'DB_NAME',
  'DB_PWD',
  'REDIS_PORT',
  'REDIS_HOST',
  'REDIS_PWD',
  'REDIS_USERNAME',
  'TWT_API_KEY',
  'TWT_API_KEY_SECRET',
]

const unsetEnv = requiredEnv.filter(
  (env) => !(typeof process.env[env] !== 'undefined'),
)
if (unsetEnv.length > 0) {
  const err = new Error(
    'Required ENV variables are not set: [' + unsetEnv.join(', ') + ']',
  )
  throw err
}
