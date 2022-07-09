import { Sx } from '@mantine/core';

export const getSx = (sx: Sx | undefined, theme: any) => {
  if (typeof sx === 'function') return sx(theme);
  return sx;
};
