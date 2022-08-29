export const chatKeys = {
  chats: ['chats'] as const,
  chatsWithUnreadMsg: ['chatsWithUnreadMsgs'] as const,
  chat: (chatId: string) => ['chat', chatId] as const,
  messages: (chatId: number | null) => ['messages', chatId] as const,
};
