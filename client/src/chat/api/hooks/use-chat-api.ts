import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { ChatsWithUnreadMsgsQuery, Message } from 'graphql/generated';
import { ChatWithUnreadMsgsQuery } from 'graphql/generated';
import { produce } from 'immer';

import { chatKeys } from '../query-keys';
import { getNewMessagesData } from '../utils';
import { fetchChatWithUnreadMsgs } from './../requests';

type ChatsWithUnreadMsgs = ChatsWithUnreadMsgsQuery['chatsWithUnreadMsgs'];
type ChatWithUnreadMsg = ChatWithUnreadMsgsQuery['chatWithUnreadMsgs'];

export const useChatApi = () => {
  const queryClient = useQueryClient();

  const getChatsWithUnreadMsg = () => {
    return queryClient.getQueryData<ChatsWithUnreadMsgs>(chatKeys.chatsWithUnreadMsg);
  };

  const getChatIndex = (id: number) => {
    const chats = getChatsWithUnreadMsg() || [];
    const index = chats.findIndex((chat) => chat.id === id);

    return index === -1 ? null : index;
  };

  const addMsgInChatIfExist = (chatId: number, message: Message): boolean => {
    let chatIndex: number | null = getChatIndex(chatId);
    if (chatIndex === null || chatIndex === undefined) return false;

    queryClient.setQueryData<ChatsWithUnreadMsgs>(chatKeys.chatsWithUnreadMsg, (data) => {
      console.log('from addMsgInChatIfExistSet', data);
      if (!data) return data;

      if (chatIndex !== null || chatIndex !== undefined) {
        const newData = produce(data, (draft) => {
          if (!draft[chatIndex!].messages) draft[chatIndex!].messages = [];
          draft[chatIndex!].messages?.push(message);
        });

        return newData;
      }
    });
    return true;
  };

  const addNewChat = (chat: ChatWithUnreadMsg) => {
    if (!chat) return;

    queryClient.setQueryData<ChatsWithUnreadMsgs>(chatKeys.chatsWithUnreadMsg, (data) => {
      if (data) {
        return [chat, ...data] as any;
      }
      return [chat];
    });
  };

  const addMessageInChat = async (chatId: number, newMessage: Message) => {
    const isDone = addMsgInChatIfExist(chatId, newMessage);

    if (!isDone) {
      const chat = await fetchChatWithUnreadMsgs(chatId);
      if (chat) addNewChat(chat as ChatWithUnreadMsg);
    }
  };

  const addMsgInMessagesIfExist = (chatId: number, newMessage: Message) => {
    queryClient.setQueryData<InfiniteData<Message[]>>(
      chatKeys.messages(chatId),
      (data) => {
        if (!data) return;
        return getNewMessagesData(data, newMessage);
      },
    );
  };

  const removeMsgFromChat = async (chatIndex: number, messageId: number) => {
    queryClient.setQueriesData<ChatsWithUnreadMsgs>(
      chatKeys.chatsWithUnreadMsg,
      (data) => {
        const newData = produce(data, (draft) => {
          if (!draft) return;

          draft[chatIndex].messages =
            draft[chatIndex].messages?.filter((msg) => msg.id !== messageId) || [];
        });
        return newData;
      },
    );
  };

  const makeMessageToRead = (chatId: number, msgIndices: [number, number]) => {
    queryClient.setQueryData<InfiniteData<Message[]>>(
      chatKeys.messages(chatId),
      (data) => {
        if (!data) return data;
        produce(data, (draft) => {
          if (!draft) return;

          draft.pages[msgIndices[0]][msgIndices[1]].isSeen = true;
        });
      },
    );
  };

  return {
    getChatsWithUnreadMsg,
    addMsgInMessagesIfExist,
    addMessageInChat,
    removeMsgFromChat,
    makeMessageToRead,
  };
};
