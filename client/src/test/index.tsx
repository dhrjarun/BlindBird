import { NotificationsProvider } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { ChatProvider } from 'chat';
import React from 'react';
import { UserProvider } from 'user';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
  });

export function renderWithProviders(ui: React.ReactElement) {
  const testQueryClient = createTestQueryClient();
  const { rerender, ...result } = render(
    <QueryClientProvider client={testQueryClient}>
      <UserProvider>
        <ChatProvider>
          <NotificationsProvider>{ui}</NotificationsProvider>
        </ChatProvider>
      </UserProvider>
    </QueryClientProvider>,
  );
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <QueryClientProvider client={testQueryClient}>{rerenderUi}</QueryClientProvider>,
      ),
  };
}

export function createProviderWrapper() {
  const testQueryClient = createTestQueryClient();

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={testQueryClient}>
      <UserProvider>
        <ChatProvider>
          <NotificationsProvider>{children}</NotificationsProvider>
        </ChatProvider>
      </UserProvider>
    </QueryClientProvider>
  );

  return Wrapper;
}
