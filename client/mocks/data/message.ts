import { Message, Sender } from '../../src/graphql/generated';

export const messages: Message[] = [
  {
    body: 'Hi',
    sender: Sender.FirstPerson,
    chatId: 1,
    id: 1,
    isSeen: true,
    createdAt: '2022-09-02T10:29:37.698Z',
  },

  {
    body: 'Hello man!',
    sender: Sender.SecondPerson,
    chatId: 1,
    id: 2,
    isSeen: true,
    createdAt: '2022-09-02T10:29:39.237Z',
  },

  {
    body: "What's upp!",
    sender: Sender.FirstPerson,
    chatId: 2,
    id: 1,
    isSeen: true,
    createdAt: '2022-09-02T10:29:37.698Z',
  },
];
