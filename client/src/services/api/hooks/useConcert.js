import { useQuery } from '@tanstack/react-query';
import { fetchConcertById } from '../api';

export const useGetConcert = (id) =>
  useQuery({
    queryKey: ['concert', id],
    queryFn: () => fetchConcertById(id),
    enabled: !!id,
  });
