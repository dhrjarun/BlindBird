import { useMutation } from '@tanstack/react-query';
import { useMarkReadMutation } from 'chat/api';
import { gqlClient } from 'gql-client';
import { MarkSeenMutationVariables, Message, Sender } from 'graphql/generated';
import { MarkSeenDocument, MarkSeenMutation } from 'graphql/generated';
import React, { useCallback, useEffect, useRef } from 'react';

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

    // const markSeenRequest = useCallback(async () => {
    //   const { markSeen } = await gqlClient.request<
    //     MarkSeenMutation,
    //     MarkSeenMutationVariables
    //   >(MarkSeenDocument, {
    //     messageId: message.id,
    //   });
    //   return markSeen;
    // }, [message]);

    // const markSeenMutation = useMutation<boolean, unknown>(markSeenRequest, {
    //   onSuccess: () => {
    //     if (!message.chatId) return;
    //   },
    // });

    const markSeenMutation = useMarkReadMutation(chatId, chatIndex, message.id, indices);

    useEffect(() => {
      let observer!: IntersectionObserver;

      if (!message.isSeen && containerRef.current && !isMyBubble) {
        const handleObserver = (entries: IntersectionObserverEntry[]) => {
          const target = entries[0];
          if (target.isIntersecting) {
            console.log('message intersecting');

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
