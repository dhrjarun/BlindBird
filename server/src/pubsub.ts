import { RedisPubSub } from 'graphql-redis-subscriptions'
import { redis } from './redis'

export const pubsub = new RedisPubSub({
  publisher: redis as any,
  subscriber: redis as any,
})
