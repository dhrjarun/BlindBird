import { GQL_URL, GQL_WS_URL } from 'constants/api';
import { GraphQLClient } from 'graphql-request';
import { createClient } from 'graphql-ws';

export const gqlClient = new GraphQLClient(GQL_URL, { credentials: 'include' });

export const subscriptionClient = createClient({
  url: GQL_WS_URL,
});
