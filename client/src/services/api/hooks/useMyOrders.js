import { useQuery } from '@tanstack/react-query';
import { fetchMyOrders } from '../api';

export const useGetMyOrders = () =>
  useQuery({
    queryKey: ['my-orders'],
    queryFn: fetchMyOrders,
  });
