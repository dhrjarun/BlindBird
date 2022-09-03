import { Avatar, Box, Button, Group, Skeleton, Text, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { fetchChat, useChatApi, useChatCtx } from 'chat';
import { CHAT_PLACE } from 'constants/routes';
import { gqlClient } from 'gql-client';
import { Chat, UserDocument, UserQuery } from 'graphql/generated';
import { Logo } from 'logo';
import React from 'react';
import { Info } from 'react-feather';
import { useNavigate, useParams } from 'react-router-dom';
import { RegisterButton } from 'register-button';
import { useUserCtx } from 'user';

import { TWT_ABOUT_US_LINK } from '../constants/links';

export function UserProfile() {
  const { user } = useUserCtx();

  const { username } = useParams<{ username: string }>();
  const { setChatData } = useChatCtx();
  const { getChatWithIndex } = useChatApi();
  const navigate = useNavigate();

  const fetchUser = async () => {
    const { user } = await gqlClient.request<UserQuery>(UserDocument, {
      tUsername: username,
    });
    return user;
  };

  const { data, isLoading, isError } = useQuery(['user', username], fetchUser, {});

  const handleChatClick = async () => {
    if (data) {
      const _chat = await fetchChat(null, data.tId);

      if (_chat) {
        const { chat, chatIndex } = getChatWithIndex(_chat.id);

        setChatData({
          type: 'reg_chat',
          activeChat: chat as Chat,
          activeChatIndex: chatIndex,
        });
      } else {
        setChatData({ type: 'new_chat', secondPerson: data });
      }
      navigate(CHAT_PLACE);
    }
  };

  if (isError)
    return (
      <Box
        sx={(theme) => ({
          backgroundColor: theme.colors.gray[2],
          minHeight: '400px',
          height: '100vh',
          display: 'flex',
          padding: theme.spacing.md,
        })}
      >
        <Box
          sx={() => ({
            display: 'grid',
            justifyItems: 'center',
            backgroundColor: 'white',
            minWidth: '350px',
            width: 'max-content',
            margin: 'auto',
            paddingBlock: '6.5rem',
            paddingInline: '2rem',
          })}
        >
          <Text>
            No Such user <br></br> registered
          </Text>
        </Box>
      </Box>
    );

  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[2],
        minHeight: '700px',
        height: '100vh',
        display: 'flex',
        padding: theme.spacing.md,
      })}
    >
      <Logo sx={{ position: 'fixed', top: '20px', left: '20px' }} />
      {isLoading ? (
        <Box
          sx={() => ({
            display: 'grid',
            justifyItems: 'center',
            backgroundColor: 'white',
            width: 'max-content',
            margin: 'auto',
            paddingBlock: '6.5rem',
            paddingInline: '2rem',
          })}
        >
          <Skeleton
            circle
            sx={(theme) => ({ marginBottom: theme.spacing.lg })}
            height={50}
          ></Skeleton>
          <Skeleton
            sx={(theme) => ({ width: '7rem', marginBottom: theme.spacing.xs })}
            height={10}
          ></Skeleton>
          <Group
            sx={(theme) => ({
              color: theme.colors.gray[6],
              marginBottom: theme.spacing.md,
            })}
          >
            <Skeleton sx={{ width: '7rem' }} height={10}></Skeleton>
            <Skeleton sx={{ width: '7rem' }} height={10}></Skeleton>
          </Group>
          <Group
            sx={(theme) => ({
              marginTop: theme.spacing.md,
            })}
          >
            <Skeleton width={120} height={40}></Skeleton>
            <Skeleton width={120} height={40}></Skeleton>
          </Group>
        </Box>
      ) : (
        <Box
          sx={() => ({
            display: 'grid',
            justifyItems: 'center',
            backgroundColor: 'white',
            width: 'max-content',
            margin: 'auto',
            '@media (min-width: 400px)': {
              minWidth: '300px',
            },
            paddingBlock: '4rem',
            paddingInline: '2rem',
          })}
        >
          <Avatar
            radius="xl"
            src={data?.tPfp}
            sx={(theme) => ({ marginBottom: theme.spacing.lg })}
            size="lg"
          >
            {data?.tName}
          </Avatar>
          <Title
            order={1}
            sx={(theme) => ({
              fontSize: theme.fontSizes.md,
              marginBottom: theme.spacing.xs,
            })}
          >{`@${username}`}</Title>
          <Group
            sx={(theme) => ({
              color: theme.colors.gray[6],
              marginBottom: theme.spacing.md,
            })}
          >
            <Text>{`${data?.publicMetrics?.followingCount} Following`}</Text>
            <Text>{`${data?.publicMetrics?.followersCount} Followers`}</Text>
          </Group>
          <Group
            sx={(theme) => ({
              marginTop: theme.spacing.md,
            })}
          >
            <RegisterButton>Register</RegisterButton>
            {user && !data?.isRegistered && (
              <Button
                component="a"
                target="_blank"
                href={TWT_ABOUT_US_LINK + '%0A%0A@' + data?.tUsername}
              >
                Tweet
              </Button>
            )}
            <Button
              disabled={
                !user ||
                user.tUsername.toLowerCase() === username?.toLowerCase() ||
                !data?.isRegistered
              }
              onClick={handleChatClick}
            >
              Chat
            </Button>
          </Group>

          {!user && (
            <Group mt="lg" spacing="xs" sx={(theme) => ({ color: theme.colors.red })}>
              <Info size={14} />
              <Text size="sm">Need to register</Text>
            </Group>
          )}

          {user && !data?.isRegistered && (
            <Group mt="lg" spacing="xs" sx={(theme) => ({ color: theme.colors.red })}>
              <Info size={14} />
              <Text size="sm">{`${data?.tUsername} is not registered`}</Text>
            </Group>
          )}
        </Box>
      )}
    </Box>
  );
}
