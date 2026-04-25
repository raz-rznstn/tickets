import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createConcert } from '../api';

export const useCreateConcert = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createConcert,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['concerts'] }),
  });
};
