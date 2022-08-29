import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ChatProvider } from 'chat';
import React from 'react';
import ReactDOM from 'react-dom';

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
      <ChatProvider value={{ activeChat: null, activeChatIndex: -1 }}>
        <App />
        <ReactQueryDevtools />
      </ChatProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
