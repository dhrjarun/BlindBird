import { useMutation } from '@tanstack/react-query';
import { gqlClient } from 'gql-client';
import {
  CreateMessageDocument,
  CreateMessageMutation,
  CreateMessageMutationVariables,
} from 'graphql/generated';

import { useChatApi } from './use-chat-api';

export const useCreateMsgMutaton = (chatId: number | null) => {
  const chatApi = useChatApi();

  const createMessgeRequest = async ({
    chatId,
    body,
  }: CreateMessageMutationVariables) => {
    const { createMessage } = await gqlClient.request<CreateMessageMutation>(
      CreateMessageDocument,
      {
        chatId,
        body,
      },
    );

    return createMessage;
  };

  return useMutation(createMessgeRequest, {
    onSuccess: (message) => {
      if (chatId) {
        chatApi.addMsgInMessagesIfExist(chatId, message);
      }
    },
  });
};

export type UseCreateMsgMutaton = typeof useCreateMsgMutaton;
