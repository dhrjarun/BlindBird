import { Box, Container } from '@mantine/core';
import { ChatArea } from 'chat-area';
import { MyChatBubble, YourChatBubble } from 'chat-bubble';
import { ChatInput } from 'chat-input/chat-input';
import { ChatList } from 'chat-list';
import { ChatAreaHeader } from 'headers/chat-area-header';
import { PrimaryHeader } from 'headers/primary-header';
import { SidebarHeader } from 'headers/sidebar-header';
import React, { useState } from 'react';

import { ChatBox } from './chat-box';

function App() {
  const [activeContact, setActiveContact] = useState<string | null>('sdv');
  const handleContactClick = (name: string) => {
    setActiveContact(name);
  };
  return (
    <Box className="App">
      <PrimaryHeader />
      <Box>
        <Container>
          <Box
            sx={(theme) => ({
              display: 'flex',
              border: `1px solid ${theme.colors.gray[3]}`,
              minHeight: '35rem',
              height: 'calc(100vh - 7.5rem)',
            })}
          >
            <Box
              component="aside"
              sx={(theme) => ({
                flexBasis: '26rem',
                [`@media (max-width: ${theme.breakpoints.md}px)`]: activeContact
                  ? { display: 'none' }
                  : { flexBasis: '100%' },
              })}
            >
              <SidebarHeader />
              <ChatList>
                <ChatBox
                  name="Vinita Arun"
                  onClick={() => handleContactClick('Vinita Arun')}
                />
              </ChatList>
            </Box>

            <Box
              component="main"
              sx={(theme) => ({
                gridTemplateColumns: '1fr',
                height: '100%',
                display: 'grid',
                gridTemplateRows: 'max-content 1fr max-content',
                flexBasis: '100%',
                borderLeft: `1px solid ${theme.colors.gray[4]}`,
                [`@media (max-width: ${theme.breakpoints.md}px)`]: activeContact
                  ? { borderLeft: 'none' }
                  : { display: 'none' },
              })}
            >
              <ChatAreaHeader onBack={() => setActiveContact(null)} />

              <ChatArea>
                <YourChatBubble time={new Date()} message="What are you doing?" />
                <MyChatBubble time={new Date()} message="I am in my home..." />
                <MyChatBubble
                  time={new Date()}
                  message="What are you doing these days???"
                />
                <YourChatBubble time={new Date()} message="yuppp.." />
                <MyChatBubble time={new Date()} message="How is your sister???" />
                <MyChatBubble time={new Date()} message="Give me a big Sentence." />
                <YourChatBubble
                  time={new Date()}
                  message="The meaning of WORD WRAP is a word processing feature that automatically transfers a word for which there is insufficient space from the end of one line of"
                />
                <MyChatBubble
                  time={new Date()}
                  message="A complete guide to word-wrap, overflow-wrap, and word ...https://blog.logrocket.com › guide-word-wrap-overflo...
02-Nov-2021 — The name word-wrap is the legacy name for the overflow-wrap CSS property. Word-wrap was originally a non-prefixed Microsoft extension. It was ..."
                />
              </ChatArea>
              <ChatInput />
            </Box>
          </Box>
        </Container>
      </Box>
      {/* <Footer
        sx={(theme) => ({
          border: 'none',
          backgroundColor: theme.colors.gray[4],
          marginTop: theme.spacing.xl,
          textAlign: 'center',
          padding: theme.spacing.md,
        })}
        height={10}
      >
        Made with ❤️ from Dhiraj
      </Footer> */}
    </Box>
  );
}

export default App;
