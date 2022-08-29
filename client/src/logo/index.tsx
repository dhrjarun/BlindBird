import { Text, TextProps } from '@mantine/core';
import { getSx } from 'get-sx';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

type Size = 'sm' | 'md' | 'lg';
export interface LogoProps extends TextProps {
  size?: Size;
}
export const Logo: React.FC<LogoProps> = ({ size, sx, ...rest }) => {
  const sizes = useMemo(
    () => ({
      sm: '28px',
      md: '44px',
      lg: '64px',
    }),
    [],
  );

  return (
    <Text
      component={Link}
      sx={[
        () => ({
          fontSize: sizes[size || 'md'],
          lineHeight: '1em',
        }),
        ...getSx(sx),
      ]}
      m="0"
      {...rest}
      to="/"
    >
      🕊
    </Text>
  );
};
