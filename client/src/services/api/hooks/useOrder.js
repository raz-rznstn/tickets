import { useQuery } from '@tanstack/react-query';
import { fetchOrderById } from '../api';

export const useGetOrder = (orderId) =>
  useQuery({
    queryKey: ['order', orderId],
    queryFn: () => fetchOrderById(orderId),
    enabled: !!orderId,
  });
