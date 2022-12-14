import Redis from 'ioredis'

export const redis = new Redis({
  port: process.env.REDIS_PORT as unknown as number,
  host: process.env.REDIS_HOST,
  db: 0,
  retryStrategy: (times) => {
    // reconnect after
    return Math.min(times * 50, 2000)
  },
})
