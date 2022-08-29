import { ActionIcon, Avatar, Box, Group, MediaQuery, Text } from '@mantine/core';
import { Chat } from 'graphql/generated';
import React from 'react';
import { ArrowLeft } from 'react-feather';

import { getDisplayNameAndPfp } from '../../utils';

export interface HeaderProps {
  onBack?: () => void;
  chat?: Chat | null;
}
export const Header = React.forwardRef<HTMLHeadElement, HeaderProps>(
  ({ chat, onBack }, ref) => {
    if (!chat) return null;

    const { name, pfp } = getDisplayNameAndPfp(chat);

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
          <Avatar radius="xl" color="blue" src={pfp} />
          <Text>{name}</Text>
        </Group>
      </Box>
    );
  },
);

Header.displayName = 'ChatMainHeader';
