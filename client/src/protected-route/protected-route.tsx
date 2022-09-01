import { Button, Group, Modal, Text } from '@mantine/core';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RegisterButton } from 'register-button';
import { useUserCtx } from 'user';

export interface ProtectedRouteProps {}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useUserCtx();
  const location = useLocation();
  const navigate = useNavigate();

  if (!user)
    return (
      <>
        <Modal
          centered={true}
          withCloseButton={false}
          closeOnClickOutside={false}
          onClose={() => {}}
          opened={!user}
          size="sm"
          sx={{ textAlign: 'center' }}
        >
          <Text sx={{ fontSize: '38px' }}>🔒</Text>
          <Text size="md" mb="sm" underline>
            Protected Route
          </Text>
          <Text color="gray" mb="lg">
            {`'${location.pathname}'`} is a Protected Route,
            <br></br> you need to register to access it
          </Text>
          <Group position="center">
            <Button
              size="xs"
              compact
              color="gray"
              onClick={() => {
                navigate(-1);
              }}
            >
              Go Back
            </Button>
            <RegisterButton compact size="xs">
              Register
            </RegisterButton>
          </Group>
        </Modal>
      </>
    );

  return <>{children}</>;
};

ProtectedRoute.displayName = 'ProtectedRoute';
