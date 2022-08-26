import { Box, Loader } from '@mantine/core';
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { ChatBubble, LoadingChatBubble } from 'chat-bubble';
import { Header } from 'chat-main/header';
import { gqlClient } from 'gql-client';
import {
  Chat,
  CreateMessageDocument,
  CreateMessageMutation,
  CreateMessageMutationVariables,
  CursorType,
  Message,
  MessagesDocument,
  MessagesQuery,
  Sender,
} from 'graphql/generated';
import { getNewMessagesData } from 'query-utils';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { ChatInput } from './chat-input';
import { ChatScrollApi, ChatScrollArea } from './chat-scroll-area';

export interface ChatMainProps {
  chat: Chat | null;
  onEmptyChat: () => void;
}
export const ChatMain: React.FC<ChatMainProps> = ({ chat, onEmptyChat, ...rest }) => {
  const scrollApiRef = useRef<ChatScrollApi>();
  const prevStateRef = useRef<{
    isLoading: boolean;
    isFetchingPreviousPage: boolean;
    pagesLength: number;
    lastPageLength: number;
    firstPageLength: number;
    loadingMsgsLength: number;
  }>();

  const fetchMessages = useCallback(
    async ({
      pageParam = {},
    }: {
      pageParam?: { cursor?: number; cursorType?: CursorType };
    }) => {
      if (!chat) return;

      const { messages } = await gqlClient.request<MessagesQuery>(MessagesDocument, {
        chatId: chat.id,
        cursor: pageParam?.cursor,
        CursorType: pageParam?.cursorType,
      });

      return messages.reverse();
    },
    [chat],
  );
  const [loadingMsgs, setLoadingMsgs] = useState<string[]>([]);

  const queryClient = useQueryClient();

  const sender = chat?.firstPerson ? Sender.FirstPerson : Sender.SecondPerson;

  const { data, isLoading, fetchPreviousPage, isFetchingPreviousPage, hasPreviousPage } =
    useInfiniteQuery(['messages', chat?.id], fetchMessages, {
      getNextPageParam: (lastPage) => ({ cursor: lastPage?.at(-1)?.id }),
      getPreviousPageParam: (firstPage = []) => {
        if (firstPage.length < 12) return undefined;
        return { cursor: firstPage?.at(0)?.id };
      },
    });

  // this will put the scroll to bottom at start
  useEffect(() => {
    if (!isLoading) {
      scrollApiRef.current?.scrollToBottom();
    }
  }, [chat, isLoading]);

  const createMessgeRequest = async ({
    chatId,
    body,
  }: CreateMessageMutationVariables) => {
    const { createMessage } = await gqlClient.request<CreateMessageMutation>(
      CreateMessageDocument,
      {
        chatId,
        body,
      },
    );

    return createMessage;
  };

  const createMsgMutation = useMutation(createMessgeRequest, {
    onSuccess: (message) => {
      queryClient.setQueryData<InfiniteData<Message[]>>(
        ['messages', chat?.id],
        (data) => {
          const newData = getNewMessagesData(data, message);

          setLoadingMsgs(loadingMsgs.filter((text) => text !== message.body));

          return newData;
        },
      );
    },
  });

  const handleCreateMessage = (text: string) => {
    if (!chat) return;
    scrollApiRef.current?.scrollToBottom();
    setLoadingMsgs([...loadingMsgs, text]);
    createMsgMutation.mutate({ body: text, chatId: chat.id });
  };

  useEffect(() => {
    const prevState = prevStateRef.current;
    const scrollApi = scrollApiRef.current;

    if (
      prevState &&
      scrollApi &&
      (prevState.lastPageLength !== data?.pages[data?.pages.length - 1]?.length ||
        data?.pages[data?.pages.length - 1]?.length == 1) &&
      scrollApi.snapshot().wasScrollToBottom
    ) {
      scrollApi.scrollToBottom('smooth');
    } else if (
      prevState &&
      scrollApi &&
      prevState.isFetchingPreviousPage &&
      hasPreviousPage
    ) {
      scrollApi.scrollToMatch();
    }
  }, [data, hasPreviousPage, loadingMsgs]);

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
        [`@media (max-width: ${theme.breakpoints.md}px)`]: chat
          ? { borderLeft: 'none' }
          : { display: 'none' },
      })}
      {...rest}
    >
      <Header onBack={onEmptyChat} chat={chat} />
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
        {chat &&
          data?.pages.map((msgs, indexA) => (
            <React.Fragment key={'msgBody-' + indexA}>
              {msgs?.map((msg, indexB) => (
                <ChatBubble
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
      {chat && <ChatInput onSubmit={handleCreateMessage} />}
    </Box>
  );
};

ChatMain.displayName = 'ChatMain';
