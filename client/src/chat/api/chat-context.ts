import { Chat } from 'graphql/generated';
import React from 'react';

export interface ChatContextProps {
  activeChat: Chat | null;
  activeChatIndex: number;
}
export const ChatContext = React.createContext<ChatContextProps>({
  activeChat: null,
  activeChatIndex: -1,
});

export const ChatProvider = ChatContext.Provider;

export const useChatCtx = () => {
  return React.useContext(ChatContext);
};
