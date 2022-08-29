import {
  Anchor,
  Box,
  Button,
  Container,
  CopyButton,
  Group,
  Input,
  MantineTheme,
  Text,
  Title,
} from '@mantine/core';
import { DHRJ_GITHUB, DHRJ_TWITTER, GITHUB_REPO } from 'constants/links';
import { BASE, CHAT_PLACE, TWT_PROFILES } from 'constants/routes';
import { Field, Form, Formik } from 'formik';
import { Logo } from 'logo';
import React from 'react';
import { AtSign, Twitter } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { RegisterButton } from 'register-button';
import { UserAvatar } from 'user-avatar';
import { useUserCtx } from 'user-ctx';

export function LandingPage() {
  const user = useUserCtx();
  const navigate = useNavigate();

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
        <RegisterButton size="sm" radius="xs">
          Register
        </RegisterButton>
        <UserAvatar />
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
                    variant="light"
                    onClick={() => {}}
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

          <CopyButton timeout={20000} value={`${BASE}${TWT_PROFILES}/${user?.tUsername}`}>
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
          <Button
            component="a"
            href={GITHUB_REPO}
            target="_blank"
            compact
            size="sm"
            variant="subtle"
          >
            Github Repo
          </Button>
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
