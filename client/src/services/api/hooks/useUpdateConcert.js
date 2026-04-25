import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateConcert } from '../api';

export const useUpdateConcert = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateConcert(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['concerts'] });
      queryClient.invalidateQueries({ queryKey: ['concert', id] });
    },
  });
};
