import { useQuery } from '@tanstack/react-query';
import { fetchStats } from '../api';

export const useGetStats = () =>
  useQuery({
    queryKey: ['stats'],
    queryFn: fetchStats,
  });
