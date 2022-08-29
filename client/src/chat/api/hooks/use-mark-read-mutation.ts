import { useMutation } from '@tanstack/react-query';

import { markReadRequest } from '../requests';
import { useChatApi } from './use-chat-api';

export const useMarkReadMutation = (
  chatId: number,
  chatIndex: number,
  messageId: number,
  msgIndices: [number, number],
) => {
  const chatApi = useChatApi();
  const markReadMutation = useMutation(markReadRequest, {
    onSuccess: () => {
      chatApi.makeMessageToRead(chatId, msgIndices);
      chatApi.removeMsgFromChat(chatIndex, messageId);
    },
  });

  return markReadMutation;
};
