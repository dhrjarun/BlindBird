import { NotificationsProvider } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ChatProvider } from 'chat';
import React from 'react';
import ReactDOM from 'react-dom';
import { UserProvider } from 'user';

import App from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: Infinity,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ChatProvider>
          <NotificationsProvider position="top-right">
            <App />
          </NotificationsProvider>
          <ReactQueryDevtools />
        </ChatProvider>
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
