import { useMutation } from '@tanstack/react-query';
import { gqlClient } from 'gql-client';
import { Message, Sender } from 'graphql/generated';
import { MarkSeenDocument, MarkSeenMutation } from 'graphql/generated';
import React from 'react';

import { BubbleBase, BubbleBaseContainer } from './bubble-base';
import { Time } from './time';

export interface ChatBubbleProps {
  message: Message | undefined;
  sender: Sender;
  indices: [number, number];
}
export const ChatBubble: React.FC<ChatBubbleProps> = React.memo(({ message, sender }) => {
  if (!message) return null;

  const markSeenRequest = async () => {
    const { markSeen } = await gqlClient.request<MarkSeenMutation>(MarkSeenDocument);
    return markSeen;
  };

  const MarkSeenMutation = useMutation(markSeenRequest, {
    onSuccess: () => {
      if (!message.chatId) return;
    },
  });

  const isMyBubble = message.sender === sender;

  return (
    <BubbleBaseContainer>
      <BubbleBase
        align={isMyBubble ? 'right' : 'left'}
        sx={(theme) => ({
          backgroundColor: isMyBubble ? theme.colors.blue[0] : theme.colors.gray[0],
        })}
      >
        {message.body}
        <Time time={message.createdAt} />
      </BubbleBase>
    </BubbleBaseContainer>
  );
});

ChatBubble.displayName = 'ChatBubble';
