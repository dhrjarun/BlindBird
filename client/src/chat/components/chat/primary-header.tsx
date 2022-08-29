import { Box, Container } from '@mantine/core';
import { Logo } from 'logo';
import React from 'react';
import { RegisterButton } from 'register-button';
import { UserAvatar } from 'user-avatar';

export interface PrimaryHeaderProps {}
export const PrimaryHeader = React.forwardRef<HTMLHeadElement, PrimaryHeaderProps>(
  (props, ref) => {
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
          <Logo size="sm" />
          <RegisterButton size="sm">Register</RegisterButton>
          <UserAvatar size="sm" />
        </Container>
      </Box>
    );
  },
);

PrimaryHeader.displayName = 'PrimaryHeader';
