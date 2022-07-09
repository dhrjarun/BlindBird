import { Avatar, Group, Text } from '@mantine/core';
import React from 'react';

export interface ChatBoxProps extends React.ComponentPropsWithoutRef<'div'> {
  isActive?: boolean;
  name?: string;
  dp?: string;
}
export const ChatBox = React.forwardRef<HTMLDivElement, ChatBoxProps>(
  ({ name, dp, isActive, ...rest }, ref) => {
    return (
      <Group
        {...rest}
        ref={ref}
        sx={(theme) => ({
          padding: theme.spacing.sm,
          backgroundColor: isActive ? theme.colors.gray[2] : 'white',
          borderBottom: `1px solid ${theme.colors.gray[4]}`,
          ':hover': {
            backgroundColor: theme.colors.gray[0],
          },
          ':active': {
            backgroundColor: theme.colors.gray[1],
          },
        })}
      >
        <Avatar radius="xl" color="cyan" src={dp} />
        <Text>{name}</Text>
      </Group>
    );
  },
);

ChatBox.displayName = 'ChatBox';
