import { ActionIcon, Avatar, Box, Group, MediaQuery, Text } from '@mantine/core';
import { useChatCtx } from 'chat/api';
import React from 'react';
import { ArrowLeft } from 'react-feather';

import { getDisplayNameAndPfp } from '../../utils';

export interface HeaderProps {}
export const Header = React.forwardRef<HTMLHeadElement, HeaderProps>((props, ref) => {
  const {
    data: { activeChat, secondPerson },
    chatData,
    setChatData,
  } = useChatCtx();
  if (!chatData) return null;

  const { name, pfp } = activeChat
    ? getDisplayNameAndPfp(activeChat)
    : { name: secondPerson?.tName, pfp: secondPerson?.tPfp };

  const handleBackClick = () => {
    setChatData(null);
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
