import { Box, Button, Textarea } from '@mantine/core';
import React from 'react';

export interface ChatInputProps {}
export const ChatInput = React.forwardRef<HTMLDivElement, ChatInputProps>(
  (props, ref) => {
    return (
      <Box
        ref={ref}
        sx={(theme) => ({
          display: 'flex',
          borderTop: `1px solid ${theme.colors.gray[3]}`,
          padding: theme.spacing.md,
          gap: '1rem',
          alignItems: 'flex-end',
        })}
        {...props}
      >
        <Textarea
          sx={() => ({ flexBasis: '100%' })}
          autosize
          placeholder="What's in your mind?"
        />
        <Button size="xs">Send</Button>
      </Box>
    );
  },
);

ChatInput.displayName = 'ChatInput';
