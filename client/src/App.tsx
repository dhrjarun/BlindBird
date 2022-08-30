import { Box } from '@mantine/core';
import { Chat, useChatsWithUnreadMsgsQuery, useNewMsgSubscription } from 'chat';
import { CHAT_PLACE, HOME, TWT_PROFILES } from 'constants/routes';
import { LandingPage } from 'landing-page';
import { ProtectedRoute } from 'protected-route';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useUserCtx } from 'user';
import { UserProfile } from 'user-profile';

function App() {
  useChatsWithUnreadMsgsQuery();
  useNewMsgSubscription();

  const { isLoading } = useUserCtx();

  return (
    <BrowserRouter>
      {isLoading ? (
        <></>
      ) : (
        <Box className="App">
          <Routes>
            <Route path={HOME} element={<LandingPage />} />
            <Route
              path={CHAT_PLACE}
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />
            <Route>
              <Route path={`${TWT_PROFILES}/:username`} element={<UserProfile />} />
            </Route>
          </Routes>
        </Box>
      )}
    </BrowserRouter>
  );
}

export default App;
