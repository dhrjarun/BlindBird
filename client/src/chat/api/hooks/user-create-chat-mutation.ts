import { useMutation } from '@tanstack/react-query';
import { gqlClient } from 'gql-client';
import {
  CreateChatDocument,
  CreateChatMutation,
  CreateChatMutationVariables,
} from 'graphql/generated';

import { useChatApi } from './use-chat-api';

export const useCreateChatMutaton = () => {
  const { addNewChat } = useChatApi();

  const createChatRequest = async ({
    secondPersonTId,
    name,
    revealGender,
  }: CreateChatMutationVariables) => {
    const { createChat } = await gqlClient.request<CreateChatMutation>(
      CreateChatDocument,
      {
        secondPersonTId,
        name,
        revealGender,
      },
    );

    return createChat;
  };

  return useMutation(createChatRequest, {
    onSuccess: (chat) => {
      addNewChat(chat);
    },
  });
};

export type UseCreateMsgMutaton = typeof useCreateChatMutaton;
