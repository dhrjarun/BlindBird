import { Box, Button, Textarea } from '@mantine/core';
import { Field, Form, Formik } from 'formik';
import React from 'react';

export interface ChatInputProps {
  onSubmit: (message: string) => void;
}
export const ChatInput = React.forwardRef<HTMLDivElement, ChatInputProps>(
  ({ onSubmit, ...rest }, ref) => {
    return (
      <Formik
        initialValues={{ message: '' }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          onSubmit(values.message);
          setSubmitting(false);
          resetForm();
        }}
        validate={(values) => {
          const errors: { message?: string } = {};
          if (!values.message) {
            errors.message = 'Required';
          }
          return errors;
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box
              ref={ref}
              sx={(theme) => ({
                display: 'flex',
                borderTop: `1px solid ${theme.colors.gray[3]}`,
                padding: theme.spacing.md,
                gap: '1rem',
                alignItems: 'flex-end',
              })}
              {...rest}
            >
              <Field
                className="message-input"
                name="message"
                as={Textarea}
                sx={() => ({ flexBasis: '100%' })}
                autosize
                placeholder="What's in your mind?"
              />
              <Button
                className="message-submit-btn"
                type="submit"
                disabled={isSubmitting}
                size="xs"
              >
                Send
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    );
  },
);

ChatInput.displayName = 'ChatInput';
