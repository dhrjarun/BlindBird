import { ScrollArea, ScrollAreaProps } from '@mantine/core';
import { Chat } from 'graphql/generated';
import React from 'react';

import { useChatCtx, useChatsWithUnreadMsgsQuery } from '../../api';
import { Item } from './item';

export interface ChatAsideProps {}
export const ChatAside = React.forwardRef<HTMLDivElement, ChatAsideProps>(
  ({ ...rest }, ref) => {
    const { data: chats, isLoading, isError } = useChatsWithUnreadMsgsQuery();
    const { activeChat, setChatData } = useChatCtx();

    if (isLoading || !chats)
      return <ScrollArea {...getScrollAreaProps(rest)}>loading</ScrollArea>;
    if (isError) return <ScrollArea {...getScrollAreaProps(rest)}>error</ScrollArea>;

    return (
      <ScrollArea viewportRef={ref} {...getScrollAreaProps(rest)}>
        {chats?.map((chat, index) => (
          <Item
            chat={chat as Chat}
            isActive={chat.id === activeChat?.id}
            key={chat.id}
            onClick={() => {
              setChatData({ activeChat: chat as Chat, activeChatIndex: index });
            }}
          />
        ))}
      </ScrollArea>
    );
  },
);

const getScrollAreaProps = (props: {} = {}): ScrollAreaProps => {
  return {
    scrollbarSize: 4,
    scrollHideDelay: 500,
    offsetScrollbars: true,
    type: 'hover',
    ...props,
  };
};

ChatAside.displayName = 'ChatAside';
