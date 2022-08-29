import { MutationFunction } from '@tanstack/react-query';
import { gqlClient } from 'gql-client';
import {
  ChatDocument,
  ChatQuery,
  ChatQueryVariables,
  MarkSeenDocument,
  MarkSeenMutation,
  MarkSeenMutationVariables,
} from 'graphql/generated';

import {
  ChatWithUnreadMsgsDocument,
  ChatWithUnreadMsgsQuery,
  ChatWithUnreadMsgsQueryVariables,
} from './../../graphql/generated';

export type FetchChat = (chatId: number) => Promise<ChatQuery['chat'] | null>;

export const fetchChat: FetchChat = async (chatId) => {
  const { chat } = await gqlClient.request<ChatQuery, ChatQueryVariables>(ChatDocument, {
    chatId,
  });

  return chat;
};

export type FetchChatWithUnreadMsgs = (
  chatId: number,
) => Promise<ChatWithUnreadMsgsQuery['chatWithUnreadMsgs'] | null>;

export const fetchChatWithUnreadMsgs: FetchChat = async (chatId) => {
  const { chatWithUnreadMsgs } = await gqlClient.request<
    ChatWithUnreadMsgsQuery,
    ChatWithUnreadMsgsQueryVariables
  >(ChatWithUnreadMsgsDocument, {
    chatId,
  });

  return chatWithUnreadMsgs;
};

export const markReadRequest: MutationFunction<
  boolean,
  MarkSeenMutationVariables
> = async ({ messageId }) => {
  const { markSeen } = await gqlClient.request<
    MarkSeenMutation,
    MarkSeenMutationVariables
  >(MarkSeenDocument, {
    messageId,
  });
  return markSeen;
};
