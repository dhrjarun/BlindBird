import { Alert, Avatar, Box, Button, Group, Skeleton, Text, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { gqlClient } from 'gql-client';
import { UserDocument, UserQuery } from 'graphql/generated';
import { Logo } from 'logo';
import React from 'react';
import { Info } from 'react-feather';
import { useParams } from 'react-router-dom';
import { RegisterButton } from 'register-button';
import { useUserCtx } from 'user';

import { TWT_ABOUT_US_LINK } from '../constants/links';

export function UserProfile() {
  const { user } = useUserCtx();

  const { username } = useParams<{ username: string }>();

  const fetchUser = async () => {
    const { user } = await gqlClient.request<UserQuery>(UserDocument, {
      tUsername: username,
    });
    return user;
  };

  const { data, isLoading, isError } = useQuery(['user', username], fetchUser, {});

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
            >
              Chat
            </Button>
          </Group>
          {!user && (
            <Alert
              icon={<Info size={16} />}
              color={'red'}
              sx={() => ({ marginTop: '4rem', maxWidth: '36ch' })}
              title="Need to Register"
            >
              You can&apos;t chat without registering, Just click the button on the top to
              register.
            </Alert>
          )}
          {user && !data?.isRegistered && (
            <Alert
              icon={<Info size={16} />}
              color="red"
              sx={() => ({ marginTop: '4rem', maxWidth: '36ch' })}
              title={`${data?.tUsername} is not registered`}
            >
              The User is not registered with us, you can tweet about us by tagging him.
            </Alert>
          )}
        </Box>
      )}
    </Box>
  );
}
