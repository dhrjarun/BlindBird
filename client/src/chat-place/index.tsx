import { Box, Container } from '@mantine/core';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { ChatAside } from 'chat-aside';
import { subscriptionClient } from 'gql-client';
import { gql } from 'graphql-request';
import { PrimaryHeader } from 'headers/primary-header';
import { SidebarHeader } from 'headers/sidebar-header';
import { getNewMessagesData } from 'query-utils';
import React, { useEffect, useState } from 'react';

import { ChatMain } from '../chat-main';
import { Chat, Message, NewMessageSubscription } from '../graphql/generated';

export function ChatPlace() {
  const [activeContact, setActiveContact] = useState<Chat | null>(null);

  const handleActiveChatChange = (chat: Chat) => {
    setActiveContact(chat);
  };

  const handleEmptyChat = () => {
    setActiveContact(null);
  };

  const queryClient = useQueryClient();

  useEffect(() => {
    subscriptionClient.subscribe<NewMessageSubscription>(
      {
        query: gql`
          subscription NewMessage {
            newMessage {
              id
              createdAt
              isSeen
              body
              sender
              chatId
            }
          }
        `,
      },
      {
        next: (value) => {
          const chatId = value.data?.newMessage.chatId;
          if (!chatId) return;

          queryClient.setQueryData<InfiniteData<Message[]>>(
            ['messages', chatId],
            (data) => {
              if (!value.data?.newMessage) return data;
              return getNewMessagesData(data, value.data?.newMessage);
            },
          );
        },
        error: (err) => {
          console.log('ws', err);
        },
        complete: () => {
          console.log('ws', 'completed');
        },
      },
    );
  }, []);

  return (
    <Box>
      <Container>
        <PrimaryHeader />
        <Box
          sx={(theme) => ({
            display: 'flex',
            border: `1px solid ${theme.colors.gray[3]}`,
            minHeight: '35rem',
            height: 'calc(100vh - 6.2rem)',
          })}
        >
          <Box
            component="aside"
            sx={(theme) => ({
              flexBasis: '26rem',
              display: 'grid',
              gridTemplateRows: 'max-content 1fr',
              gridTemplateColumns: '1fr',
              [`@media (max-width: ${theme.breakpoints.md}px)`]: activeContact
                ? { display: 'none' }
                : { flexBasis: '100%' },
            })}
          >
            <SidebarHeader />
            <ChatAside
              onActiveChatChange={handleActiveChatChange}
              activeChat={activeContact}
            />
          </Box>
          <ChatMain chat={activeContact} onEmptyChat={handleEmptyChat} />
        </Box>
      </Container>
    </Box>
  );
}
