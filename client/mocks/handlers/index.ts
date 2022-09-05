import { graphql } from 'msw';

import {
  Chat,
  ChatFromIdQuery,
  ChatFromIdQueryVariables,
  ChatFromSecondPersonTIdQuery,
  ChatFromSecondPersonTIdQueryVariables,
  ChatsWithUnreadMsgsQuery,
  CreateChatMutation,
  CreateChatMutationVariables,
  CreateMessageMutation,
  CreateMessageMutationVariables,
  MeQuery,
  Message,
  MessagesQuery,
  MessagesQueryVariables,
  Sender,
  User,
  UserQuery,
  UserQueryVariables,
} from '../../src/graphql/generated';
import { chats, messages, userI, users } from '../data';

const api = graphql.link('http://localhost:3100/graphql');

export const handlers = [
  api.query<MeQuery>('Me', (req, res, ctx) => {
    return res(ctx.data({ __typename: 'Query', me: userI }));
  }),

  api.query<UserQuery, UserQueryVariables>('User', (req, res, ctx) => {
    const { tUsername } = req.variables;
    return res(
      ctx.data({
        __typename: 'Query',
        user: users.find(
          (user) => user.tUsername.toLowerCase() === tUsername.toLowerCase(),
        ),
      }),
    );
  }),

  api.query<ChatsWithUnreadMsgsQuery>('ChatsWithUnreadMsgs', (req, res, ctx) => {
    return res(ctx.data({ __typename: 'Query', chatsWithUnreadMsgs: chats }));
  }),

  api.query<MessagesQuery, MessagesQueryVariables>('Messages', (req, res, ctx) => {
    const { chatId } = req.variables;
    return res(
      ctx.data({
        __typename: 'Query',
        messages: messages.filter((msg) => msg.chatId === chatId),
      }),
    );
  }),

  api.query<ChatFromIdQuery, ChatFromIdQueryVariables>('ChatFromId', (req, res, ctx) => {
    const { chatId } = req.variables;

    return res(
      ctx.data({ __typename: 'Query', chat: chats.find((chat) => chat.id === chatId) }),
    );
  }),

  api.query<ChatFromSecondPersonTIdQuery, ChatFromSecondPersonTIdQueryVariables>(
    'ChatFromSecondPersonTId',
    (req, res, ctx) => {
      const { secondPersonTId } = req.variables;

      return res(
        ctx.data({
          __typename: 'Query',
          chat: chats.find((chat) => chat.secondPerson.tId === secondPersonTId),
        }),
      );
    },
  ),

  api.mutation<CreateChatMutation, CreateChatMutationVariables>(
    'CreateChat',
    (req, res, ctx) => {
      const { secondPersonTId, name, revealGender } = req.variables;

      const chat = chats.find(
        (chat) =>
          chat.firstPerson!.tId === userI.tId &&
          chat.secondPerson.tId === secondPersonTId,
      );

      if (chat) return res(ctx.errors([{ message: "can't create chat" }]));

      const newChat: Chat = {
        id: chats.length + 1,
        name,
        revealGender,
        firstPerson: userI,
        secondPerson: users.find((user) => user.tId === secondPersonTId) as User,
        createAt: Date.now(),
        messages: null,
      };

      chats.push(newChat);

      return res(ctx.data({ __typename: 'Mutation', createChat: newChat }));
    },
  ),

  api.mutation<CreateMessageMutation, CreateMessageMutationVariables>(
    'CreateMessage',
    (req, res, ctx) => {
      const { body, chatId } = req.variables;

      const chat = chats.find((chat) => chat.id === chatId);

      if (!chat) return res(ctx.errors([{ message: 'cannot find chat' }]));

      const newMessage: Message = {
        id: messages.length + 1,
        body,
        createdAt: Date.now(),
        chatId: chat!.id,
        isSeen: false,
        sender: Sender.FirstPerson,
      };

      messages.push(newMessage);

      return res(ctx.data({ __typename: 'Mutation', createMessage: newMessage }));
    },
  ),
];
