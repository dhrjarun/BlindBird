import { isDevEnv } from './isDevEnv';

export const DEV_SERVER_BASE_URL = 'http://localhost:3100';
export const PROD_SERVER_BASE_URL = 'https://api.blindbird.online';
export const DEV_SERVER_WS_URL = 'ws://localhost:3100';
export const PROD_SERVER_WS_URL = 'wss://api.blindbird.online';

export const TWT_REGISTER = isDevEnv()
  ? `${DEV_SERVER_BASE_URL}/auth/twitter`
  : `${PROD_SERVER_BASE_URL}/auth/twitter`;
export const GQL_URL = isDevEnv()
  ? `${DEV_SERVER_BASE_URL}/graphql`
  : `${PROD_SERVER_BASE_URL}/graphql`;
export const GQL_WS_URL = isDevEnv()
  ? `${DEV_SERVER_WS_URL}/subs`
  : `${PROD_SERVER_WS_URL}/subs`;
export const LOGOUT_URL = isDevEnv()
  ? `${DEV_SERVER_BASE_URL}/logout`
  : `${PROD_SERVER_BASE_URL}/logout`;
