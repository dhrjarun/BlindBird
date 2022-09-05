import { GQL_URL } from 'constants/api';
import { GraphQLClient } from 'graphql-request';

export const gqlClient = new GraphQLClient(GQL_URL, { credentials: 'include' });
