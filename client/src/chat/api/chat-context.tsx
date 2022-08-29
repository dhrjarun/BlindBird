import { Chat } from 'graphql/generated';
import React, { useState } from 'react';

export type ChatData = {
  activeChat: Chat | null;
  activeChatIndex: number;
};

export interface ChatContextProps extends ChatData {
  setChatData: React.Dispatch<React.SetStateAction<ChatData>>;
}

export const ChatContext = React.createContext<ChatContextProps>({} as ChatContextProps);

export const ChatProvider: React.FC = ({ children }) => {
  const [chatData, setChatData] = useState<ChatData>({
    activeChat: null,
    activeChatIndex: -1,
  });

  return (
    <ChatContext.Provider value={{ ...chatData, setChatData }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatCtx = () => {
  return React.useContext(ChatContext);
};
