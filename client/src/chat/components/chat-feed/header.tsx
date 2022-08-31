import { ActionIcon, Avatar, Box, Group, MediaQuery, Text } from '@mantine/core';
import { useChatCtx } from 'chat/api';
import React from 'react';
import { ArrowLeft } from 'react-feather';

import { getDisplayNameAndPfp } from '../../utils';

export interface HeaderProps {}
export const Header = React.forwardRef<HTMLHeadElement, HeaderProps>((props, ref) => {
  const { activeChat, setChatData } = useChatCtx();
  if (!activeChat) return null;

  const { name, pfp } = getDisplayNameAndPfp(activeChat);

  const handleBackClick = () => {
    setChatData({ activeChat: null, activeChatIndex: -1 });
  };

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
          <ActionIcon onClick={handleBackClick}>
            <ArrowLeft />
          </ActionIcon>
        </MediaQuery>
        <Avatar radius="xl" color="blue" src={pfp} />
        <Text>{name}</Text>
      </Group>
    </Box>
  );
});

Header.displayName = 'ChatMainHeader';
