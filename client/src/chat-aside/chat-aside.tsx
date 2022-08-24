import { ScrollArea, ScrollAreaProps } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { gqlClient } from 'gql-client';
import { Chat, ChatsDocument, ChatsQuery } from 'graphql/generated';
import React from 'react';

import { Item } from './item';

export interface ChatAsideProps {
  activeChat: Chat | null;
  onActiveChatChange: (chat: Chat) => void;
}
export const ChatAside = React.forwardRef<HTMLDivElement, ChatAsideProps>(
  ({ activeChat, onActiveChatChange, ...rest }, ref) => {
    const fetchChats = async () => {
      const { chats } = await gqlClient.request<ChatsQuery>(ChatsDocument);
      return chats;
    };

    const { data: chats, isLoading, isError } = useQuery(['chats'], fetchChats);

    if (isLoading || !chats)
      return <ScrollArea {...getScrollAreaProps(rest)}>loading</ScrollArea>;
    if (isError) return <ScrollArea {...getScrollAreaProps(rest)}>error</ScrollArea>;

    return (
      <ScrollArea viewportRef={ref} {...getScrollAreaProps(rest)}>
        {chats?.map((chat) => (
          <Item
            isActive={chat.id === activeChat?.id}
            key={chat.id}
            name={chat?.firstPerson ? chat.secondPerson.tName : `unknown #${chat.id}`}
            pfp={chat?.firstPerson ? chat.secondPerson.tPfp : null}
            onClick={() => {
              onActiveChatChange(chat as Chat);
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
