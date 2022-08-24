import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { gqlClient } from 'gql-client';
import { Message, MessagesQuery } from 'graphql/generated';
import { MarkSeenDocument, MarkSeenMutation } from 'graphql/generated';
import produce from 'immer';
import React, { useRef } from 'react';

import { BubbleBase, BubbleBaseContainer } from './bubble-base';
import { Time } from './time';

export interface YourChatBubbleProps {
  message: Message;
}
export const YourChatBubble: React.FC<YourChatBubbleProps> = React.memo(
  ({ message, ...rest }) => {
    // const queryClient = useQueryClient();
    let observer: IntersectionObserver;

    const markSeenRequest = async () => {
      const { markSeen } = await gqlClient.request<MarkSeenMutation>(MarkSeenDocument);
      return markSeen;
    };

    const MarkSeenMutation = useMutation(markSeenRequest, {
      onSuccess: () => {
        if (!message.chatId) return;

        // queryClient.setQueryData(
        //   ['messages', message.chatId],
        //   (data: InfiniteData<MessagesQuery>) => {
        //     const newData = produce(data, draft => {
        //       draft
        //     })
        //   },
        // );
      },
    });

    const baseRef = useRef<HTMLDivElement>((node) => {
      if (node && message.isSeen) {
        observer = new IntersectionObserver(() => {});
      } else {
        if (observer) observer.unobserve(node);
      }
    });

    return (
      <BubbleBaseContainer ref={baseRef} {...rest}>
        <BubbleBase
          sx={(theme) => ({
            backgroundColor: theme.colors.gray[0],
          })}
        >
          {message.body}
          <Time time={message.createdAt} />
        </BubbleBase>
      </BubbleBaseContainer>
    );
  },
);

YourChatBubble.displayName = 'YourChatBubble';
