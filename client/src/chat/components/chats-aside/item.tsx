import { Avatar, Group, Text } from '@mantine/core';
import React from 'react';

export interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  isActive?: boolean;
  name?: string;
  pfp?: string | null;
}
export const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ name, pfp, isActive, ...rest }, ref) => {
    return (
      <Group
        {...rest}
        ref={ref}
        sx={(theme) => ({
          paddingInline: theme.spacing.sm,
          paddingBlock: theme.spacing.xs,
          backgroundColor: isActive ? theme.colors.gray[1] : 'white',
          ':hover': {
            backgroundColor: isActive ? theme.colors.gray[1] : theme.colors.gray[0],
          },
        })}
      >
        <Avatar radius="xl" color="cyan" src={pfp} />
        <Text>{name}</Text>
      </Group>
    );
  },
);

Item.displayName = 'AsideItem';
