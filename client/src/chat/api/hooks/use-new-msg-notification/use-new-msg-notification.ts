import { showNotification } from '@mantine/notifications';
import { Chat, Message } from 'graphql/generated';
import React, { useEffect, useState } from 'react';

import { getDisplayNameAndPfp } from '../../../utils';
import { useChatCtx } from '../../chat-context';
import { useChatApi } from '../use-chat-api';

export const useNewMsgNotification = () => {
  const [msg, setNewMessage] = useState<Message | null>(null);
  const { chatData } = useChatCtx();
  const { getChatWithIndex } = useChatApi();

  useEffect(() => {
    if (msg && msg.chatId) {
      if (chatData?.activeChat.id === msg.chatId) return;
      const { chat } = getChatWithIndex(msg.chatId);

      if (!chat) return;

      const { name } = getDisplayNameAndPfp(chat as Chat);

      showNotification({
        title: `New message from ${name}`,
        className: 'new-msg-notification',
        message: msg.body,
      });
      setNewMessage(null);
    }
  }, [msg]);

  return {
    newMsg: (msg: Message) => {
      setNewMessage(msg);
    },
  };
};
