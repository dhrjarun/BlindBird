import { Box, Container } from '@mantine/core';
import { Chat as ChatType } from 'graphql/generated';
import React, { useState } from 'react';

import { ChatFeed } from '../chat-feed';
import { ChatAside } from '../chats-aside';
import { PrimaryHeader } from './primary-header';
import { SidebarHeader } from './sidebar-header';

export type ChatData = {
  chat: ChatType;
  chatIndex: number;
};

export function Chat() {
  const [activeChatData, setActiveChatData] = useState<{
    chat: ChatType;
    chatIndex: number;
  } | null>(null);

  const handleActiveChatChange = (chatData: ChatData) => {
    setActiveChatData(chatData);
  };

  const handleEmptyChat = () => {
    setActiveChatData(null);
  };

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
              [`@media (max-width: ${theme.breakpoints.md}px)`]: activeChatData
                ? { display: 'none' }
                : { flexBasis: '100%' },
            })}
          >
            <SidebarHeader />
            <ChatAside
              onActiveChatChange={handleActiveChatChange}
              activeChat={activeChatData?.chat || null}
            />
          </Box>
          <ChatFeed
            chatIndex={activeChatData?.chatIndex || 0}
            chat={activeChatData?.chat || null}
            onEmptyChat={handleEmptyChat}
          />
        </Box>
      </Container>
    </Box>
  );
}
