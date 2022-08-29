import { Sx } from '@mantine/core';

type Sxx = Sx | (Sx | undefined)[] | undefined;

export const getSx = (sx: Sxx) => {
  if (Array.isArray(sx)) return sx;

  return [sx] || [{}];
};
