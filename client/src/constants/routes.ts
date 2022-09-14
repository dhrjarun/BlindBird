import { isDevEnv } from './isDevEnv';
export const BASE = isDevEnv() ? 'http://localhost:3000' : 'http://blindbird.com';
export const HOME = '/';
export const TWT_PROFILES = '/t';
export const CHAT_PLACE = '/chat-place';
