import {
  ActionIcon,
  Anchor,
  Box,
  Button,
  Container,
  CopyButton,
  Group,
  Input,
  MantineTheme,
  Modal,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { DHRJ_GITHUB, DHRJ_TWITTER, GITHUB_REPO, TWT_BLIND_LINK } from 'constants/links';
import { TWT_ABOUT_US_LINK } from 'constants/links';
import { BASE, CHAT_PLACE, TWT_PROFILES } from 'constants/routes';
import { Field, Form, Formik } from 'formik';
import { Logo } from 'logo';
import React, { useState } from 'react';
import { AtSign, GitHub } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { RegisterButton } from 'register-button';
import { useUserCtx } from 'user';
import { UserAvatar } from 'user-avatar';

export function LandingPage() {
  const { user } = useUserCtx();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Container
      sx={() => ({
        display: 'grid',
        minHeight: '500px',
        height: '100vh',
        gridTemplateRows: 'max-content minmax(300px, 1fr) max-content',
      })}
    >
      <Box
        component="header"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Logo size="lg" m="md" />
        <Group>
          <Tooltip label="Github Repo">
            <ActionIcon
              component="a"
              href={GITHUB_REPO}
              target="_blank"
              radius="xl"
              size="lg"
              variant="filled"
            >
              <GitHub size="16" />
            </ActionIcon>
          </Tooltip>
          <RegisterButton size="sm" radius="xs">
            Register
          </RegisterButton>
          <UserAvatar />
        </Group>
      </Box>
      <Box component="main" sx={{ alignSelf: 'center', paddingBottom: '4rem' }}>
        <Title
          align="center"
          order={1}
          sx={() => ({
            fontSize: '1.5rem',
            marginBottom: '3rem',
            letterSpacing: '1px',
          })}
        >
          Send Someone a Secret <br></br> Message
        </Title>
        <Formik
          initialValues={{ username: '' }}
          validate={(values) => {
            const errors: { username?: string } = {};
            if (!values.username) {
              errors.username = 'Required';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            navigate(`${TWT_PROFILES}/${values.username}`);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                as={Input}
                sx={(theme: MantineTheme) => ({
                  maxWidth: 600,
                  margin: 'auto',
                  marginBottom: theme.spacing.sm,
                })}
                name="username"
                icon={<AtSign />}
                size="lg"
                placeholder="Enter the twitter username"
                rightSectionWidth={100}
                rightSection={
                  <Button
                    disabled={isSubmitting}
                    size="xs"
                    type="submit"
                    variant="filled"
                    color="gray"
                  >
                    Submit
                  </Button>
                }
              />
            </Form>
          )}
        </Formik>
        <Group position="center" spacing="xs">
          <Button
            onClick={() => {
              navigate(CHAT_PLACE);
            }}
            compact
            size="sm"
            variant="subtle"
          >
            Go to Chat
          </Button>

          {user && (
            <CopyButton
              timeout={20000}
              value={`${BASE}${TWT_PROFILES}/${user?.tUsername}`}
            >
              {({ copied, copy }) => (
                <Button
                  compact
                  size="sm"
                  onClick={copy}
                  color={copied ? 'green' : ''}
                  variant={copied ? 'light' : 'subtle'}
                >
                  Copy Blind Link
                </Button>
              )}
            </CopyButton>
          )}

          <Button
            component="a"
            href={
              user
                ? TWT_BLIND_LINK + `${BASE}${TWT_PROFILES}/${user?.tUsername}`
                : TWT_ABOUT_US_LINK
            }
            target="_blank"
            compact
            size="sm"
            variant="subtle"
          >
            Tweet
          </Button>

          <Modal
            centered={true}
            opened={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Quick Start Guide"
          >
            <Text size="sm" weight="bold">
              What is BlindBird? 🕊
            </Text>
            <Text color="gray" size="sm" mb="md">
              BlindBird is a Anonymous chatting App. In simple words, here you can chat
              with a person without revealing your identity.
            </Text>

            <Text size="sm" weight="bold">
              How to Start? 🎬
            </Text>
            <Text color="gray" size="sm" mb="md">
              For that you need to register using twitter. You will get your BlindLink
              after that.
            </Text>

            <Text size="sm" weight="bold">
              What is Blind Link? 🔗
            </Text>
            <Text color="gray" size="sm" mb="md">
              Blind Link is the URL, by which you can message a person or someone can
              message you.
            </Text>

            <Text size="sm" weight="bold">
              Do I store your email? 📫
            </Text>
            <Text color="gray" size="sm" mb="md">
              Nope.
            </Text>
          </Modal>

          <Button
            onClick={() => {
              setModalOpen(true);
            }}
            compact
            size="sm"
            variant="subtle"
          >
            Quick-Start Guide
          </Button>

          {!user && (
            <RegisterButton compact size="sm" variant="subtle">
              Let&apos;s go
            </RegisterButton>
          )}
        </Group>
      </Box>
      <Box component="footer" sx={{ alignSelf: 'flex-end', padding: '2rem' }}>
        <Text align="center">Made with ❤️ by Dhiraj</Text>
        <Text align="center">
          <Anchor href={DHRJ_TWITTER} target="_blank">
            Twitter{' '}
          </Anchor>
          &#183;
          <Anchor href={DHRJ_GITHUB} target="_blank">
            {' '}
            Github
          </Anchor>
        </Text>
      </Box>
    </Container>
  );
}
