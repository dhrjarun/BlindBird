import { Box, Sx, Text } from '@mantine/core';
import { getSx } from 'get-sx';
import React from 'react';

export interface BubbleBaseProps {
  sx?: Sx;
  children?: React.ReactNode;
  align?: 'left' | 'right';
}
export const BubbleBase = React.forwardRef<HTMLDivElement, BubbleBaseProps>(
  ({ children, sx, align }, ref) => {
    return (
      <Text
        sx={(theme) => ({
          padding: theme.spacing.xs,
          paddingBottom: '0',
          borderRadius: theme.radius.sm,
          boxShadow: theme.shadows.xs,
          justifySelf: align === 'right' ? 'flex-end' : 'flex-start',
          wordWrap: 'break-word',
          maxWidth: '70%',
          [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            maxWidth: '85%',
          },
          ...getSx(sx, theme),
        })}
        ref={ref}
      >
        {children}
      </Text>
    );
  },
);

BubbleBase.defaultProps = {
  align: 'left',
};

BubbleBase.displayName = 'BubbleBase';

export interface BubbleBaseContainerProps {
  sx?: Sx;
  children?: React.ReactNode;
}
export const BubbleBaseContainer = React.forwardRef<
  HTMLDivElement,
  BubbleBaseContainerProps
>(({ children, sx }, ref) => {
  return (
    <Box
      ref={ref}
      sx={(theme) => ({ marginBottom: theme.spacing.xs, display: 'grid', ...sx })}
    >
      {children}
    </Box>
  );
});

BubbleBaseContainer.displayName = 'BubbleBaseContainer';
