import { Chat } from '../../src/graphql/generated';
import { userI, userII } from './user';

export const chatI: Chat = {
  __typename: 'Chat',
  name: '',
  createAt: '',
  id: 1,
  revealGender: false,
  firstPerson: userI,
  secondPerson: userII,
  messages: null,
};

export const chatII: Chat = {
  __typename: 'Chat',
  name: 'Anti',
  createAt: '',
  id: 2,
  revealGender: false,
  firstPerson: userII,
  secondPerson: userI,
  messages: null,
};

export const chats: Chat[] = [chatI, chatII];
