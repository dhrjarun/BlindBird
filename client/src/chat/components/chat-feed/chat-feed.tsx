import { Box, Loader } from '@mantine/core';
import { useChatApi, useChatCtx, useCreateMsgMutaton, useMessagesQuery } from 'chat/api';
import { useCreateChatMutaton } from 'chat/api/hooks/user-create-chat-mutation';
import { Sender } from 'graphql/generated';
import React, { useEffect, useRef, useState } from 'react';

import { LoadingChatBubble, MessageBubble } from '../message-bubble';
import { ChatInput } from './chat-input';
import { ChatScrollApi, ChatScrollArea } from './chat-scroll-area';
import { Header } from './header';

export interface ChatFeedProps {}
export const ChatFeed: React.FC<ChatFeedProps> = ({ ...rest }) => {
  const scrollApiRef = useRef<ChatScrollApi>();
  const prevStateRef = useRef<{
    isLoading: boolean;
    isFetchingPreviousPage: boolean;
    pagesLength: number;
    lastPageLength: number;
    firstPageLength: number;
    loadingMsgsLength: number;
  }>();

  const { chatData, setChatData } = useChatCtx();
  const { activeChat, activeChatIndex, type: chatType } = chatData || {};

  const [loadingMsgs, setLoadingMsgs] = useState<string[]>([]);

  const sender = activeChat?.firstPerson ? Sender.FirstPerson : Sender.SecondPerson;

  const { data, isLoading, fetchPreviousPage, isFetchingPreviousPage, hasPreviousPage } =
    useMessagesQuery(activeChat?.id || null);

  const { removeChat } = useChatApi();

  useEffect(() => {
    const data = chatData;

    return () => {
      if (data && data.type === 'new') {
        removeChat(data.activeChat.id);
      }
    };
  }, [chatData]);

  // this will put the scroll to bottom at start
  useEffect(() => {
    if (!isLoading) {
      scrollApiRef.current?.scrollToBottom();
    }
  }, [activeChat, isLoading]);

  const createMsgMutation = useCreateMsgMutaton(activeChat?.id || 1);
  const createChatMutation = useCreateChatMutaton();

  const handleCreateMessage = async (text: string) => {
    if (!activeChat) return;

    scrollApiRef.current?.scrollToBottom();
    setLoadingMsgs([...loadingMsgs, text]);

    if (chatType === 'new') {
      await createChatMutation.mutateAsync(
        {
          name: activeChat.name,
          secondPersonTId: activeChat.secondPerson.tId,
          revealGender: activeChat.revealGender,
        },
        {
          onSuccess: (chat) => {
            setChatData({ type: 'reg', activeChatIndex: 0, activeChat: chat });

            createMsgMutation.mutate(
              { body: text, chatId: chat.id },
              {
                onSuccess: () => {
                  setLoadingMsgs(loadingMsgs.filter((itemText) => text !== itemText));
                },
              },
            );
          },
        },
      );

      return;
    }

    createMsgMutation.mutate(
      { body: text, chatId: activeChat.id },
      {
        onSuccess: () => {
          setLoadingMsgs(loadingMsgs.filter((itemText) => text !== itemText));
        },
      },
    );
  };

  useEffect(() => {
    const prevState = prevStateRef.current;
    const scrollApi = scrollApiRef.current;

    if (
      // for new message by creation
      prevState &&
      scrollApi &&
      loadingMsgs.length !== prevState.loadingMsgsLength &&
      scrollApi.snapshot().wasScrollToBottom
    ) {
      scrollApi.scrollToBottom('smooth');
    } else if (
      // for new message from subscription data?.pages[data?.pages.length - 1]?.length)
      (prevState &&
        scrollApi &&
        scrollApi?.snapshot().wasScrollToBottom &&
        prevState.lastPageLength !== data?.pages[data?.pages.length - 1]?.length) ||
      data?.pages[data?.pages.length - 1]?.length === 1
    ) {
      scrollApi?.scrollToBottom('smooth');
    } else if (
      // for old messages
      prevState &&
      scrollApi &&
      prevState.isFetchingPreviousPage &&
      hasPreviousPage
    ) {
      scrollApi.scrollToMatch();
    }
  }, [data, hasPreviousPage, loadingMsgs, prevStateRef, scrollApiRef]);

  useEffect(() => {
    prevStateRef.current = {
      isLoading,
      isFetchingPreviousPage,
      pagesLength: data?.pages.length || 0,
      firstPageLength: data?.pages[0]?.length || 0,
      lastPageLength: data?.pages[data?.pages.length - 1]?.length || 0,
      loadingMsgsLength: loadingMsgs.length || 0,
    };
  }, [data, isLoading, isFetchingPreviousPage, loadingMsgs]);

  return (
    <Box
      component="main"
      sx={(theme) => ({
        gridTemplateColumns: '1fr',
        height: '100%',
        display: 'grid',
        gridTemplateRows: 'max-content 1fr max-content',
        flexBasis: '100%',
        borderLeft: `1px solid ${theme.colors.gray[4]}`,
        [`@media (max-width: ${theme.breakpoints.md}px)`]: activeChat
          ? { borderLeft: 'none' }
          : { display: 'none' },
      })}
      {...rest}
    >
      <Header />
      <ChatScrollArea
        getChatScrollApi={(api) => {
          scrollApiRef.current = api;
        }}
        onReachingLoadingThreshold={() => {
          if (hasPreviousPage) fetchPreviousPage();
        }}
      >
        <Box
          sx={(theme) => ({
            display: 'flex',
            justifyContent: 'center',
            paddingBlock: theme.spacing.lg,
          })}
        >
          {isFetchingPreviousPage && <Loader size="sm" />}
        </Box>
        {activeChat &&
          data?.pages.map((msgs, indexA) => (
            <React.Fragment key={'msgBody-' + indexA}>
              {msgs?.map((msg, indexB) => (
                <MessageBubble
                  chatId={activeChat.id}
                  chatIndex={activeChatIndex ?? -1} // don't use || cuz, value can be 0
                  key={msg.id}
                  sender={sender}
                  indices={[indexA, indexB]}
                  message={msg}
                />
              ))}
            </React.Fragment>
          ))}
        {loadingMsgs.map((text) => (
          <LoadingChatBubble key={text} text={text} />
        ))}
      </ChatScrollArea>
      {chatData && <ChatInput onSubmit={handleCreateMessage} />}
    </Box>
  );
};

ChatFeed.displayName = 'ChatFeed';
