import { subscriptionClient } from 'gql-client';
import { NewMessageSubscription } from 'graphql/generated';
import { gql } from 'graphql-request';
import { useEffect } from 'react';
import { useUserCtx } from 'user';

import { useChatApi } from './use-chat-api';

export const useNewMsgSubscription = () => {
  let error: unknown;
  let isComplete: boolean = false;
  const { user } = useUserCtx();
  console.log('useEffect sub outside', user);

  const { addMsgInMessagesIfExist, addMessageInChat } = useChatApi();

  useEffect(() => {
    if (!user) return;
    const unsubscribe = subscriptionClient.subscribe<NewMessageSubscription>(
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
        next: async (value) => {
          const newMessage = value.data?.newMessage;
          const chatId = newMessage?.chatId;
          if (!chatId || !newMessage) return;

          addMsgInMessagesIfExist(chatId, newMessage);
          addMessageInChat(chatId, newMessage);
        },
        error: (err) => {
          error = err;
        },
        complete: () => {
          isComplete = true;
        },
      },
    );
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);

  return { error, isComplete };
};
