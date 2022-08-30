import { useMarkReadMutation } from 'chat/api';
import { Message, Sender } from 'graphql/generated';
import React, { useEffect, useRef } from 'react';

import { BubbleBase, BubbleBaseContainer } from './bubble-base';
import { Time } from './time';

export interface MessageBubbleProps {
  chatId: number;
  chatIndex: number;
  message: Message | undefined;
  sender: Sender;
  indices: [number, number];
}
export const MessageBubble: React.FC<MessageBubbleProps> = React.memo(
  ({ message, sender, chatId, chatIndex, indices }) => {
    if (!message) return null;
    const containerRef = useRef<HTMLDivElement>(null);
    const isMyBubble = message.sender === sender;

    const markSeenMutation = useMarkReadMutation(chatId, chatIndex, message.id, indices);

    useEffect(() => {
      let observer!: IntersectionObserver;

      if (!message.isSeen && containerRef.current && !isMyBubble) {
        const handleObserver = (entries: IntersectionObserverEntry[]) => {
          const target = entries[0];
          if (target.isIntersecting) {
            markSeenMutation.mutate({ messageId: message.id });
          }
        };

        observer = new IntersectionObserver(handleObserver);
        observer.observe(containerRef.current);
      } else if (observer && message.isSeen && containerRef.current && !isMyBubble) {
        observer.unobserve(containerRef.current);
      }
    }, [containerRef.current, message]);

    return (
      <BubbleBaseContainer ref={containerRef}>
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
  },
);

MessageBubble.displayName = 'MessageBubble';
