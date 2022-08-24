import { Message, MessagesQuery, Sender } from 'graphql/generated';
import React from 'react';

import { MyChatBubble, YourChatBubble } from '../chat-bubble';

export interface BodyProps {
  messages: MessagesQuery['messages'] | undefined;
  sender: Sender;
}

export const Body: React.FC<BodyProps> = ({ messages, sender }) => {
  if (!messages) return null;
  return (
    <>
      {messages.map((msg: Message) => {
        return msg.sender === sender ? (
          <MyChatBubble message={msg} key={msg.id} />
        ) : (
          <YourChatBubble message={msg} key={msg.id} />
        );
      })}
    </>
  );
};

Body.displayName = 'ChatMainBody';
