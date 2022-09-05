import '@testing-library/jest-dom';

import { fireEvent, screen } from '@testing-library/dom';
import { cleanup } from '@testing-library/react';
import { useChatCtx } from 'chat/api/chat-context';
import { Sender } from 'graphql/generated';
import React, { useEffect } from 'react';
import { renderWithProviders } from 'test';

import { useChatsWithUnreadMsgsQuery } from '../use-chats-with-unread-msgs-query';
import { useNewMsgNotification } from './use-new-msg-notification';

const Comp: React.FC<{ type: 'null' | 'onActive' | 'onAnotherActive' }> = ({ type }) => {
  const { data } = useChatsWithUnreadMsgsQuery();

  const { newMsg } = useNewMsgNotification();
  const { setChatData } = useChatCtx();

  const handleClick = () => {
    if (!data) return;
    newMsg({
      body: 'Hello',
      chatId: type === 'onActive' ? data[0].id : data[1].id,
      createdAt: Date.now(),
      sender: Sender.FirstPerson,
      id: 1,
      isSeen: false,
    });
  };

  useEffect(() => {
    if (data && type === 'null') {
      setChatData(null);
    }
    if (data && type === 'onAnotherActive') {
      setChatData({ activeChat: data[0], activeChatIndex: 0 });
    }

    if (data && type === 'onActive') {
      setChatData({ activeChat: data[0], activeChatIndex: 0 });
    }
  }, [data]);

  return (
    <div>
      {data && <p data-testid="data-populated"></p>}
      <button onClick={handleClick} className="new-msg-trigger-btn">
        Trigger New Message
      </button>
    </div>
  );
};

afterEach(cleanup);

it('notification should show up if no chat is selected', async () => {
  renderWithProviders(<Comp type="null" />);

  await screen.findByTestId('data-populated');

  fireEvent(
    screen.getByText('Trigger New Message'),
    new MouseEvent('click', { bubbles: true, button: 1 }),
  );

  expect(await screen.getByText(/New message from/i)).toBeVisible();
});

it('notification should show up, if msg is not from acive chat', async () => {
  renderWithProviders(<Comp type="onAnotherActive" />);

  await screen.findByTestId('data-populated');

  fireEvent(
    screen.getByText('Trigger New Message'),
    new MouseEvent('click', { bubbles: true, button: 1 }),
  );
  expect(await screen.getByText(/^New message from/i)).toBeVisible();
});
it('notification should not show up, if msg is from acive chat', async () => {
  renderWithProviders(<Comp type="onActive" />);

  await screen.findByTestId('data-populated');

  fireEvent(
    screen.getByText('Trigger New Message'),
    new MouseEvent('click', { bubbles: true, button: 1 }),
  );

  expect(await screen.queryByText(/^New message from/i)).toBeNull();
});

it('after clicking on new message notification it should make its chat active', () => {});
