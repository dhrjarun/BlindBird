import { Text } from '@mantine/core';
import React from 'react';

export interface TimeProps {
  time: Date;
}
export const Time = React.forwardRef<HTMLParagraphElement, TimeProps>(({ time }, ref) => {
  return (
    <Text
      size="xs"
      align="right"
      sx={(theme) => ({ paddingBlock: '0.25em', color: theme.colors.gray[7] })}
      ref={ref}
    >
      {time.toLocaleString('en-in', {
        timeStyle: 'short',
        dateStyle: 'short',
        hourCycle: 'h24',
      })}
    </Text>
  );
});

Time.displayName = 'Time';
