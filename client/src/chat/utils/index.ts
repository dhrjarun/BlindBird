import { Chat } from 'graphql/generated';

export function getDisplayNameAndPfp(chat: Chat) {
  return {
    name: chat?.firstPerson
      ? chat.secondPerson.tName
      : chat.name
      ? chat.name
      : `unknown #${chat.id}`,
    pfp: chat?.firstPerson ? chat.secondPerson.tPfp : null,
  };
}
