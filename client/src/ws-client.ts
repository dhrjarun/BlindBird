import { GQL_WS_URL } from 'constants/api';
import { createClient } from 'graphql-ws';
import { WebSocket } from 'ws';

export const subscriptionClient = createClient({
  url: GQL_WS_URL,
  webSocketImpl: WebSocket,
});
