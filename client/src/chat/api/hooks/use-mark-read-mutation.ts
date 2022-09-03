import { useMutation } from '@tanstack/react-query';

import { markReadRequest } from '../requests';

export const useMarkReadMutation = () => {
  const markReadMutation = useMutation(markReadRequest);

  return markReadMutation;
};
