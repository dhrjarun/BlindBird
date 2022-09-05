import { useQuery } from '@tanstack/react-query';
import { gqlClient } from 'gql-client';
import { ChatsWithUnreadMsgsDocument, ChatsWithUnreadMsgsQuery } from 'graphql/generated';

import { chatKeys } from '../query-keys';

export const useChatsWithUnreadMsgsQuery = () => {
  const result = useQuery(chatKeys.chatsWithUnreadMsg, async () => {
    const { chatsWithUnreadMsgs } = await gqlClient.request<ChatsWithUnreadMsgsQuery>(
      ChatsWithUnreadMsgsDocument,
    );

    return chatsWithUnreadMsgs;
  });

  return result;
};
