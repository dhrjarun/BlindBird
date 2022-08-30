import { Modal, Text, Title } from '@mantine/core';
import { Logo } from 'logo';
import React from 'react';
import { RegisterButton } from 'register-button';
import { useUserCtx } from 'user';

export interface ProtectedRouteProps {}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useUserCtx();

  if (!user)
    return (
      <>
        <Logo sx={{ position: 'fixed', top: '20px', left: '20px' }} />
        <Modal
          centered={true}
          withCloseButton={false}
          closeOnClickOutside={false}
          onClose={() => {}}
          opened={!user}
        >
          <Title>Chat</Title>
          <Text>This is a Protected Route, you need to register to access it</Text>
          <RegisterButton>Register</RegisterButton>
        </Modal>
      </>
    );

  return <>{children}</>;
};

ProtectedRoute.displayName = 'ProtectedRoute';
