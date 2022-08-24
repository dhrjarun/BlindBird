import React, { useContext } from 'react';

import { MeQuery } from './graphql/generated';

type User = MeQuery['me'];

export const UserCtx = React.createContext<User | null>(null);

export const UserProvider = UserCtx.Provider;

export const userUserCtx = () => {
  return useContext(UserCtx);
};
