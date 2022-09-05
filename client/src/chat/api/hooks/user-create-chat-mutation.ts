import { useMutation } from '@tanstack/react-query';
import { update } from 'cypress/types/lodash';
import { gqlClient } from 'gql-client';
import {
  CreateChatDocument,
  CreateChatMutation,
  CreateChatMutationVariables,
} from 'graphql/generated';

import { useChatApi } from './use-chat-api';

export const useCreateChatMutaton = () => {
  const { updateChat } = useChatApi();

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
      updateChat(-1, chat);
    },
  });
};

export type UseCreateMsgMutaton = typeof useCreateChatMutaton;
