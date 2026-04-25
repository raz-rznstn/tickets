import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteConcert } from '../api';

export const useDeleteConcert = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteConcert,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['concerts'] }),
  });
};
