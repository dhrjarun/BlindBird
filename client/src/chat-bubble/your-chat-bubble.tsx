import React from 'react';

import { BubbleBase, BubbleBaseContainer } from './bubble-base';
import { Time } from './time';

export interface YourChatBubbleProps {
  time: Date;
  message: string;
}
export const YourChatBubble = React.forwardRef<HTMLDivElement, YourChatBubbleProps>(
  ({ message, time, ...rest }, ref) => {
    return (
      <BubbleBaseContainer ref={ref} {...rest}>
        <BubbleBase
          sx={(theme) => ({
            backgroundColor: theme.colors.gray[0],
          })}
        >
          {message}
          <Time time={time} />
        </BubbleBase>
      </BubbleBaseContainer>
    );
  },
);

YourChatBubble.displayName = 'YourChatBubble';
