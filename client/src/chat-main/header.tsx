import { ActionIcon, Avatar, Box, Group, MediaQuery, Text } from '@mantine/core';
import React from 'react';
import { ArrowLeft } from 'react-feather';

export interface HeaderProps {
  onBack?: () => void;
}
export const Header = React.forwardRef<HTMLHeadElement, HeaderProps>(
  ({ onBack }, ref) => {
    return (
      <Box
        component="header"
        sx={(theme) => ({
          borderBottom: `1px solid ${theme.colors.gray[3]}`,
          paddingInline: theme.spacing.xs,
          display: 'flex',
          justifyContent: 'space-between',
          height: '4rem',
        })}
        ref={ref}
      >
        <Group>
          <MediaQuery largerThan="md" styles={{ display: 'none' }}>
            <ActionIcon onClick={onBack}>
              <ArrowLeft />
            </ActionIcon>
          </MediaQuery>
          <Avatar radius="xl" color="blue" />
          <Text>Dhiraj Arun</Text>
        </Group>
      </Box>
    );
  },
);

Header.displayName = 'ChatMainHeader';
