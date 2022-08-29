import { Chat } from 'graphql/generated';

export function getDisplayNameAndPfp(chat: Chat) {
  return {
    name: chat?.firstPerson ? chat.secondPerson.tName : `unknown #${chat.id}`,
    pfp: chat?.firstPerson ? chat.secondPerson.tPfp : null,
  };
}
