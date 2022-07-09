import { ActionIcon, Avatar, Box, Group, MediaQuery, Text } from '@mantine/core';
import React from 'react';
import { ArrowLeft } from 'react-feather';

export interface ChatAreaHeaderProps {
  onBack?: () => void;
}
export const ChatAreaHeader = React.forwardRef<HTMLHeadElement, ChatAreaHeaderProps>(
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

ChatAreaHeader.displayName = 'ChatAreaHeader';
