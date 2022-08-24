import { TwitterApi } from 'twitter-api-v2'

export const twtApi = new TwitterApi(process.env.TWT_BEARER_TOKEN as string)
