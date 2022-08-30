import { useQuery } from '@tanstack/react-query';
import { gqlClient } from 'gql-client';
import { MeDocument, MeQuery } from 'graphql/generated';
import React, { useContext } from 'react';

type User = MeQuery['me'];

export interface UserCtxProps {
  user: User | null;
  isLoading: boolean;
  isError: boolean;
}

export const UserCtx = React.createContext<UserCtxProps>({} as UserCtxProps);

export const useUserCtx = () => {
  return useContext(UserCtx);
};

export const UserProvider: React.FC<{}> = ({ children }) => {
  const { data, isLoading, isError } = useQuery<MeQuery['me']>(
    ['me'],
    async () => {
      const { me } = await gqlClient.request(MeDocument);
      return me;
    },
    { staleTime: Infinity, retry: false },
  );
  return (
    <UserCtx.Provider value={{ user: data || null, isLoading, isError }}>
      {children}
    </UserCtx.Provider>
  );
};
