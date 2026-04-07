import { useMutation } from '@tanstack/react-query';
import { validateTicket } from '../api';

// TODO: depends on server route POST /api/validator/validate being implemented
// TODO: depends on transaction_id being saved on the Order when a purchase is made
export const useValidateTicket = () =>
  useMutation({
    mutationFn: validateTicket,
  });
