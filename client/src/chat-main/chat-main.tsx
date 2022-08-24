import { Box, Loader } from '@mantine/core';
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { LoadingChatBubble } from 'chat-bubble';
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
import React, { useCallback, useRef, useState } from 'react';

import { Body } from './body';
import { ChatInput } from './chat-input';

export interface ChatMainProps {
  chat: Chat | null;
  onEmptyChat: () => void;
}
export const ChatMain: React.FC<ChatMainProps> = ({ chat, onEmptyChat, ...rest }) => {
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

  const { data, fetchPreviousPage, isFetchingPreviousPage, hasPreviousPage } =
    useInfiniteQuery(['messages', chat?.id], fetchMessages, {
      getNextPageParam: (lastPage) => ({ cursor: lastPage?.at(-1)?.id }),
      getPreviousPageParam: (firstPage = []) => {
        if (firstPage.length < 12) return undefined;
        return { cursor: firstPage?.at(0)?.id };
      },
    });

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
    setLoadingMsgs([...loadingMsgs, text]);
    createMsgMutation.mutate({ body: text, chatId: chat.id });
  };

  const observer = useRef<IntersectionObserver>();

  const observerElm = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting) {
          console.log('intersecting');
          if (hasPreviousPage) fetchPreviousPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [chat, hasPreviousPage],
  );

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
      {chat && <Header onBack={onEmptyChat} />}
      <Box
        sx={(theme) => ({
          paddingInline: theme.spacing.md,
          paddingBlock: theme.spacing.sm,
          overflowY: 'scroll',
          display: 'flex',
          flexDirection: 'column',
        })}
      >
        <Box
          ref={observerElm}
          sx={(theme) => ({
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: theme.spacing.lg,
          })}
          className="observer"
        >
          {isFetchingPreviousPage && <Loader size="sm" />}
        </Box>
        {chat &&
          data?.pages.map((data) => (
            <Body key={data[0]?.id} sender={sender} messages={data} />
          ))}
        {loadingMsgs.map((text) => (
          <LoadingChatBubble key={text} text={text} />
        ))}
      </Box>
      {chat && <ChatInput onSubmit={handleCreateMessage} />}
    </Box>
  );
};

const getAfterCursor = (data: InfiniteData<Message[]>): number => {
  const lastPage = data.pages[data.pages.length - 1];
  const lastMessage = lastPage[lastPage.length - 1];

  return lastMessage.id;
};

ChatMain.displayName = 'ChatMain';
