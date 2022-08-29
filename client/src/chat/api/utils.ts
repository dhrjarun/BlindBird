import { InfiniteData } from '@tanstack/react-query';
import { CursorType, Message } from 'graphql/generated';
import produce from 'immer';

export const getAfterCursor = (data: InfiniteData<Message[]>): number => {
  const lastPage = data.pages[data.pages.length - 1];
  const lastMessage = lastPage[lastPage.length - 1];

  return lastMessage.id;
};

export const getNewMessagesData = (
  oldData: InfiniteData<Message[]> | undefined,
  message: Message,
) => {
  const newData = produce(oldData, (draft) => {
    if (!draft) draft = { pages: [], pageParams: [] };

    const pagesLength = draft.pages.length;
    const pagesLastIndex = pagesLength - 1;

    if (draft.pages[pagesLastIndex].length < 12)
      draft.pages[pagesLastIndex].push(message);
    else {
      const param = {
        CursorType: getAfterCursor(draft),
        cursorType: CursorType.After,
      };

      draft.pageParams.push(param);
      draft.pages.push([message]);
    }
  });

  return newData;
};
