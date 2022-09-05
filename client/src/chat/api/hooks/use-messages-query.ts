import { useInfiniteQuery } from '@tanstack/react-query';
import { gqlClient } from 'gql-client';
import { CursorType, MessagesDocument, MessagesQuery } from 'graphql/generated';
import { useCallback } from 'react';

import { chatKeys } from '../query-keys';

export const useMessagesQuery = (chatId: number | null) => {
  const fetchMessages = useCallback(
    async ({
      pageParam = {},
    }: {
      pageParam?: { cursor?: number; cursorType?: CursorType };
    }) => {
      if (!chatId) return;

      const { messages } = await gqlClient.request<MessagesQuery>(MessagesDocument, {
        chatId: chatId,
        cursor: pageParam?.cursor,
        CursorType: pageParam?.cursorType,
      });

      return messages?.reverse();
    },
    [chatId],
  );

  return useInfiniteQuery(chatKeys.messages(chatId), fetchMessages, {
    getNextPageParam: (lastPage) => ({ cursor: lastPage?.at(-1)?.id }),
    getPreviousPageParam: (firstPage = []) => {
      if (firstPage.length < 12) return undefined;
      return { cursor: firstPage?.at(0)?.id };
    },
  });
};

export type UseMessagesQuery = typeof useMessagesQuery;
