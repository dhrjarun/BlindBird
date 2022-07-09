import { Box, Button, Container, Title } from '@mantine/core';
import React from 'react';

export interface PrimaryHeaderProps {}
export const PrimaryHeader = React.forwardRef<HTMLHeadElement, PrimaryHeaderProps>(
  (props, ref) => {
    return (
      <Box
        component="header"
        sx={(theme) => ({
          backgroundColor: theme.colors.gray[1],
          paddingBlock: '1rem',
          marginBottom: '1.5rem',
        })}
        ref={ref}
        {...props}
      >
        <Container
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Title order={4} sx={{ lineHeight: '1em', height: '1em' }}>
            Secret Message🕊
          </Title>
          <Button radius="xs" size="sm">
            Register
          </Button>
        </Container>
      </Box>
    );
  },
);

PrimaryHeader.displayName = 'PrimaryHeader';
