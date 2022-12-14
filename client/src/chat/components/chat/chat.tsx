import { Box, Container } from '@mantine/core';
import { useChatCtx } from 'chat/api';
import React, { useEffect } from 'react';

import { ChatFeed } from '../chat-feed';
import { ChatAside } from '../chats-aside';
import { PrimaryHeader } from './primary-header';
import { SidebarHeader } from './sidebar-header';

export function Chat() {
  const { chatData, setChatData } = useChatCtx();

  // for removing active chat after the unmount of chat component
  useEffect(() => {
    return () => {
      setChatData(null);
    };
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
              [`@media (max-width: ${theme.breakpoints.md}px)`]: chatData
                ? { display: 'none' }
                : { flexBasis: '100%' },
            })}
          >
            <SidebarHeader />
            <ChatAside />
          </Box>
          <ChatFeed />
        </Box>
      </Container>
    </Box>
  );
}
