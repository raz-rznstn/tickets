import { useQuery } from '@tanstack/react-query';
import { fetchConcerts } from '../api';

export const useGetConcertsList = () =>
  useQuery({
    queryKey: ['concerts'],
    queryFn: fetchConcerts,
  });
