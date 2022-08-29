import { Avatar, Badge, Group, Text } from '@mantine/core';
import { Chat } from 'graphql/generated';
import React from 'react';

import { getDisplayNameAndPfp } from '../../utils';

export interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  chat: Chat;
  isActive?: boolean;
}
export const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ chat, isActive, ...rest }, ref) => {
    const { name, pfp } = getDisplayNameAndPfp(chat);

    return (
      <Group
        position="apart"
        sx={(theme) => ({
          paddingInline: theme.spacing.sm,
          paddingBlock: theme.spacing.xs,
          backgroundColor: isActive ? theme.colors.gray[1] : 'white',
          ':hover': {
            backgroundColor: isActive ? theme.colors.gray[1] : theme.colors.gray[0],
          },
        })}
        {...rest}
        ref={ref}
      >
        <Group>
          <Avatar radius="xl" color="cyan" src={pfp} />
          <Text>{name}</Text>
        </Group>
        {chat.messages && !isActive && chat.messages.length > 0 && (
          <Badge radius="md">{chat.messages?.length}</Badge>
        )}
      </Group>
    );
  },
);

Item.displayName = 'AsideItem';
