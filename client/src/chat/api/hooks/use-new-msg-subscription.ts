import { NewMessageSubscription } from 'graphql/generated';
import { gql } from 'graphql-request';
import { ExecutionResult } from 'graphql-ws';
import { useEffect } from 'react';
import { useUserCtx } from 'user';
import { subscriptionClient } from 'ws-client';

import { useChatApi } from './use-chat-api';

export type OnNext = (value: ExecutionResult<NewMessageSubscription, unknown>) => void;
export type OnError = (error: unknown) => void;
export type onComplete = () => void;
export interface UseNewMsgSubscriptionOptions {
  onNext?: OnNext;
  onError?: OnError;
  onComplete?: onComplete;
}
export const useNewMsgSubscription = ({
  onNext,
  onError,
  onComplete,
}: UseNewMsgSubscriptionOptions = {}) => {
  let error: unknown;
  let isComplete = false;
  const { user } = useUserCtx();

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

          if (onNext) onNext(value);
        },
        error: (err) => {
          error = err;
          if (onError) onError(err);
        },
        complete: () => {
          isComplete = true;
          if (onComplete) onComplete();
        },
      },
    );
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);

  return { error, isComplete };
};
