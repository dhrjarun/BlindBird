import { Message } from 'graphql/generated';
import React from 'react';

import { BubbleBase, BubbleBaseContainer } from './bubble-base';
import { Time } from './time';

export interface MyChatBubbleProps {
  message: Message;
}
export const MyChatBubble = React.forwardRef<HTMLDivElement, MyChatBubbleProps>(
  ({ message, ...rest }, ref) => {
    return (
      <BubbleBaseContainer ref={ref} {...rest}>
        <BubbleBase
          align="right"
          sx={(theme) => ({ backgroundColor: theme.colors.blue[0] })}
        >
          {message.body}
          <Time time={message.createdAt} />
        </BubbleBase>
      </BubbleBaseContainer>
    );
  },
);

MyChatBubble.displayName = 'MyChatBubble';
