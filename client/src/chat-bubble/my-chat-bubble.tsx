import React from 'react';

import { BubbleBase, BubbleBaseContainer } from './bubble-base';
import { Time } from './time';

export interface MyChatBubbleProps {
  time: Date;
  isSeen?: boolean;
  message: string;
}
export const MyChatBubble = React.forwardRef<HTMLDivElement, MyChatBubbleProps>(
  ({ message, time, ...rest }, ref) => {
    return (
      <BubbleBaseContainer ref={ref} {...rest}>
        <BubbleBase
          align="right"
          sx={(theme) => ({ backgroundColor: theme.colors.blue[0] })}
        >
          {message}
          <Time time={time} />
        </BubbleBase>
      </BubbleBaseContainer>
    );
  },
);

MyChatBubble.displayName = 'MyChatBubble';
