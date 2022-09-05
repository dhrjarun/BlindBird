import { Chat } from 'graphql/generated';
import React, { createContext, useState } from 'react';

export type ChatData = {
  type: 'reg' | 'new';
  activeChat: Chat;
  activeChatIndex: number;
};

export interface ChatContextProps {
  chatData: ChatData | null;
  setChatData: React.Dispatch<React.SetStateAction<ChatData | null>>;
}

export const ChatContext = createContext<ChatContextProps>({} as ChatContextProps);

export const ChatProvider: React.FC = ({ children }) => {
  const [chatData, setChatData] = useState<ChatData | null>(null);

  return (
    <ChatContext.Provider value={{ chatData, setChatData }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatCtx = () => {
  return React.useContext(ChatContext);
};
