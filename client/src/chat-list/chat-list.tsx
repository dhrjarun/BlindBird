import { ScrollArea } from '@mantine/core';
import React from 'react';

export interface ChatListProps {}
export const ChatList = React.forwardRef<HTMLDivElement, ChatListProps>((props, ref) => {
  return (
    <ScrollArea
      scrollbarSize={4}
      scrollHideDelay={500}
      offsetScrollbars
      type="hover"
      sx={{ height: '35rem' }}
      ref={ref}
      {...props}
    ></ScrollArea>
  );
});

ChatList.displayName = 'ChatList';
