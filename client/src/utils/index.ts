export const lastIndex = (list: any[]): number => {
  return list.length - 1;
};

export const lastItem = <T = any>(list: T[]): T => {
  return list[lastIndex(list)];
};
