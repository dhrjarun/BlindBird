import { redis } from '../redis'

export default () => {
  redis.on('error', (err) => console.log('redis client error', err))
  redis.on('connect', () => console.log('redis client started'))
}
