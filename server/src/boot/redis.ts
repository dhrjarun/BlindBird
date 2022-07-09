import connectRedis from 'connect-redis'
import session from 'express-session'
import { redis } from '../redis'

export default () => {
  const RedisStore = connectRedis(session)
  redis.on('error', (err) => console.log('redis client error', err))
  redis.on('connect', () => console.log('redis client started'))
  return RedisStore
}
