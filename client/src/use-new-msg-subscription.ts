import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { subscriptionClient } from 'gql-client';
import { Message, NewMessageSubscription } from 'graphql/generated';
import { gql } from 'graphql-request';
import { getNewMessagesData } from 'query-utils';
import { useEffect } from 'react';

export const useNewMsgSubscription = () => {
  const queryClient = useQueryClient();

  let error: unknown;

  useEffect(() => {
    subscriptionClient.subscribe<NewMessageSubscription>(
      {
        query: gql`
          subscription NewMessage {
            newMessage {
              id
              createdAt
              isSeen
              body
              sender
              chatId
            }
          }
        `,
      },
      {
        next: (value) => {
          const chatId = value.data?.newMessage.chatId;
          if (!chatId) return;

          queryClient.setQueryData<InfiniteData<Message[]>>(
            ['messages', chatId],
            (data) => {
              if (!value.data?.newMessage) return data;
              return getNewMessagesData(data, value.data?.newMessage);
            },
          );
        },
        error: (err) => {
          error = err;
        },
        complete: () => {
          console.log('ws', 'completed');
        },
      },
    );
  }, []);

  return { error };
};
