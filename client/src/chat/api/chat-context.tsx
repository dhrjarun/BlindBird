import { Chat, User } from 'graphql/generated';
import React, { useState } from 'react';

export type RegChatData = {
  type: 'reg_chat';
  activeChat: Chat;
  activeChatIndex: number;
};

export type NewChatData = {
  type: 'new_chat';
  secondPerson: User;
};

export type ChatData = RegChatData | NewChatData | null;

export type Data = {
  activeChat: Chat | null;
  activeChatIndex: number | null;
  secondPerson: User | null;
};

export interface ChatContextProps {
  chatData: ChatData;
  setChatData: React.Dispatch<React.SetStateAction<ChatData>>;
  data: Data;
}

export const ChatContext = React.createContext<ChatContextProps>({} as ChatContextProps);

export const ChatProvider: React.FC = ({ children }) => {
  const [chatData, setChatData] = useState<ChatData>(null);

  const data: Data = {
    activeChat: null,
    activeChatIndex: null,
    secondPerson: null,
  };

  if (chatData?.type === 'reg_chat') {
    data.activeChat = chatData.activeChat;
    data.activeChatIndex = chatData.activeChatIndex;
  } else if (chatData?.type === 'new_chat') {
    data.secondPerson = chatData.secondPerson;
  }

  return (
    <ChatContext.Provider value={{ chatData, setChatData, data }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatCtx = () => {
  return React.useContext(ChatContext);
};
