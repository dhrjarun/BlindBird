import { isDevEnv } from './isDevEnv';

export const DEV_SERVER_BASE_URL = 'http://localhost:3100';
export const PROD_SERVER_BASE_URL = 'http://blindbird.com';
export const DEV_SERVER_WS_URL = 'ws://localhost:3100';
export const PROD_SERVER_WS_URL = 'ws://blindbird.com';

export const TWT_REGISTER = isDevEnv()
  ? `${DEV_SERVER_BASE_URL}/auth/twitter`
  : `${PROD_SERVER_BASE_URL}/auth/twitter`;
export const GQL_URL = isDevEnv()
  ? `${DEV_SERVER_BASE_URL}/graphql`
  : `${PROD_SERVER_BASE_URL}/graphql`;
export const GQL_WS_URL = isDevEnv()
  ? `${DEV_SERVER_WS_URL}/graphql`
  : `${PROD_SERVER_WS_URL}/graphql`;
export const LOGOUT_URL = isDevEnv()
  ? `${DEV_SERVER_BASE_URL}/logout`
  : `${PROD_SERVER_BASE_URL}/logout`;
