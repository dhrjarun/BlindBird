import { ScrollArea } from '@mantine/core';
import React from 'react';

export interface ChatAreaProps {}
export const ChatArea = React.forwardRef<HTMLDivElement, ChatAreaProps>(
  ({ children, ...rest }, ref) => {
    return (
      <ScrollArea
        scrollbarSize={4}
        scrollHideDelay={500}
        offsetScrollbars
        type="hover"
        sx={(theme) => ({
          // flexBasis: '100%',
          paddingInline: theme.spacing.md,
          // height: '35rem',
          paddingBlock: theme.spacing.sm,
        })}
        ref={ref}
        {...rest}
      >
        {children}
      </ScrollArea>
    );
  },
);

ChatArea.displayName = 'ChatArea';
