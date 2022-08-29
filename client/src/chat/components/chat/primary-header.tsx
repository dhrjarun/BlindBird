import { Box, Button, Container, Text } from '@mantine/core';
import { TWT_REGISTER } from 'constants/api';
import React from 'react';
import { Link } from 'react-router-dom';
import { UserAvatar } from 'user-avatar';
import { userUserCtx } from 'user-ctx';

export interface PrimaryHeaderProps {}
export const PrimaryHeader = React.forwardRef<HTMLHeadElement, PrimaryHeaderProps>(
  (props, ref) => {
    const handleRegister = () => {
      window.open(TWT_REGISTER, '_self');
    };

    const user = userUserCtx();

    return (
      <Box
        component="header"
        sx={(theme) => ({
          border: `1px solid ${theme.colors.gray[3]}`,
          backgroundColor: theme.colors.gray[2],
          paddingBlock: '0.7rem',
          marginBlock: '0.8rem',
        })}
        ref={ref}
        {...props}
      >
        <Container
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Text
            component={Link}
            to="/"
            sx={{ lineHeight: '1em', height: '1em', fontSize: '1.7rem' }}
          >
            🕊
          </Text>
          {!user ? (
            <Button radius="xs" onClick={handleRegister} size="sm">
              Register
            </Button>
          ) : (
            <UserAvatar size="sm" />
          )}
        </Container>
      </Box>
    );
  },
);

PrimaryHeader.displayName = 'PrimaryHeader';
