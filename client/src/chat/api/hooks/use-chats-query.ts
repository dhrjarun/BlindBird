import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { gqlClient } from 'gql-client';
import { Chat, ChatsDocument, ChatsQuery } from 'graphql/generated';

export type UseChats = () => UseQueryResult<Chat[], unknown>;

export const useChats: UseChats = () => {
  const fetchChats = async () => {
    const { chats } = await gqlClient.request<ChatsQuery>(ChatsDocument);
    return chats;
  };

  return useQuery(['chats'], fetchChats);
};
