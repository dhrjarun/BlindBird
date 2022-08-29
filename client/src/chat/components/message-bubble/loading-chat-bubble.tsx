import { Box, Loader } from '@mantine/core';
import React from 'react';

import { BubbleBase, BubbleBaseContainer } from './bubble-base';

export interface LoadingChatBubbleProps {
  text: string | null;
}
export const LoadingChatBubble = React.forwardRef<HTMLDivElement, LoadingChatBubbleProps>(
  ({ text, ...rest }, ref) => {
    if (!text) return null;
    return (
      <BubbleBaseContainer ref={ref} {...rest}>
        <BubbleBase
          align="right"
          sx={(theme) => ({ backgroundColor: theme.colors.blue[0] })}
        >
          {text}
          <Box
            sx={(theme) => ({
              padding: '0px',
              margin: '0px',
              textAlign: 'right',
              color: theme.colors.gray[7],
            })}
            ref={ref}
          >
            <Loader variant="dots" size="xs" />
          </Box>
        </BubbleBase>
      </BubbleBaseContainer>
    );
  },
);

LoadingChatBubble.displayName = 'LoadingChatBubble';
