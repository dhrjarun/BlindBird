import { Box, TextInput } from '@mantine/core';
import React from 'react';

export interface SidebarHeaderProps {}
export const SidebarHeader = React.forwardRef<HTMLHeadElement, SidebarHeaderProps>(
  (props, ref) => {
    return (
      <Box
        component="header"
        sx={(theme) => ({
          paddingInline: theme.spacing.sm,
          borderBottom: `1px solid ${theme.colors.gray[2]}`,
          height: '4rem',
          display: 'grid',
          alignContent: 'center',
        })}
        ref={ref}
        {...props}
      >
        <TextInput radius="xs" size="sm" placeholder="Search" />
      </Box>
    );
  },
);

SidebarHeader.displayName = 'SidebarHeader';
