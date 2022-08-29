import { ScrollArea, ScrollAreaProps } from '@mantine/core';
import { Chat } from 'graphql/generated';
import React from 'react';

import { useChatsWithUnreadMsgsQuery } from '../../api';
import { ChatData } from '../chat';
import { Item } from './item';

export interface ChatAsideProps {
  activeChat: Chat | null;
  onActiveChatChange: (chat: ChatData) => void;
}
export const ChatAside = React.forwardRef<HTMLDivElement, ChatAsideProps>(
  ({ activeChat, onActiveChatChange, ...rest }, ref) => {
    const { data: chats, isLoading, isError } = useChatsWithUnreadMsgsQuery();

    if (isLoading || !chats)
      return <ScrollArea {...getScrollAreaProps(rest)}>loading</ScrollArea>;
    if (isError) return <ScrollArea {...getScrollAreaProps(rest)}>error</ScrollArea>;

    return (
      <ScrollArea viewportRef={ref} {...getScrollAreaProps(rest)}>
        {chats?.map((chat, index) => (
          <Item
            isActive={chat.id === activeChat?.id}
            key={chat.id}
            name={chat?.firstPerson ? chat.secondPerson.tName : `unknown #${chat.id}`}
            pfp={chat?.firstPerson ? chat.secondPerson.tPfp : null}
            onClick={() => {
              onActiveChatChange({ chat: chat as Chat, chatIndex: index });
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
