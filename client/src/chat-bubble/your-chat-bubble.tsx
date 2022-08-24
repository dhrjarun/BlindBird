import { Message } from 'graphql/generated';
import React from 'react';

import { BubbleBase, BubbleBaseContainer } from './bubble-base';
import { Time } from './time';

export interface YourChatBubbleProps {
  message: Message;
}
export const YourChatBubble = React.forwardRef<HTMLDivElement, YourChatBubbleProps>(
  ({ message, ...rest }, ref) => {
    return (
      <BubbleBaseContainer ref={ref} {...rest}>
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
