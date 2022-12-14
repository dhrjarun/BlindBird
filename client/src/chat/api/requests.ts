import { MutationFunction } from '@tanstack/react-query';
import { gqlClient } from 'gql-client';
import {
  Chat,
  ChatFromIdQuery,
  ChatFromIdQueryVariables,
  ChatFromSecondPersonTIdQuery,
  ChatFromSecondPersonTIdQueryVariables,
  ChatWithUnreadMsgsDocument,
  ChatWithUnreadMsgsQuery,
  ChatWithUnreadMsgsQueryVariables,
  MarkSeenDocument,
  MarkSeenMutation,
  MarkSeenMutationVariables,
} from 'graphql/generated';
import { gql } from 'graphql-request';

export const fetchChat = async (
  chatId: number | null,
  secondPersonTId: string | null = null,
) => {
  const fromIdQuery = gql`
    query ChatFromId($chatId: Float) {
      chat(id: $chatId) {
        id
        createAt
        firstPerson {
          tUsername
          tName
          tId
          tPfp
        }
        secondPerson {
          tId
          tUsername
          tName
          tPfp
        }
      }
    }
  `;

  const fromSecondPersonTIdQuery = gql`
    query ChatFromSecondPersonTId($secondPersonTId: String) {
      chat(secondPersonTId: $secondPersonTId) {
        id
        name
        createAt
        revealGender
        firstPerson {
          createAt
          tId
          tName
          tUsername
          tPfp
        }
        secondPerson {
          createAt
          tId
          tName
          tUsername
          tPfp
        }
      }
    }
  `;

  if (chatId) {
    const { chat } = await gqlClient.request<ChatFromIdQuery, ChatFromIdQueryVariables>(
      fromIdQuery,
      {
        chatId,
      },
    );
    return chat || null;
  }

  if (secondPersonTId) {
    const { chat } = await gqlClient.request<
      ChatFromSecondPersonTIdQuery,
      ChatFromSecondPersonTIdQueryVariables
    >(fromSecondPersonTIdQuery, { secondPersonTId });
    return chat || null;
  }
};

export type FetchChat = typeof fetchChat;

export type FetchChatWithUnreadMsgs = (
  chatId: number,
) => Promise<ChatWithUnreadMsgsQuery['chatWithUnreadMsgs'] | null>;

export const fetchChatWithUnreadMsgs: FetchChatWithUnreadMsgs = async (chatId) => {
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
