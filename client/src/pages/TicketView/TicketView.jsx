import { useParams, useNavigate } from 'react-router-dom';
import { useGetOrder } from '../../services/api/hooks/useOrder';

// TODO: import styles once designed

export default function TicketView() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const { data: order, isLoading, error } = useGetOrder(orderId);

  // TODO: handle loading state
  // TODO: handle error / not found state

  const tickets = order?.tickets ?? []; // one or more tickets per order

  return (
    <div>
      <button onClick={() => navigate('/my-orders')}>← Back to My Orders</button>

      {/* TODO: show event title, date, venue as a header */}
      <h1>{order?.title ?? orderId}</h1>

      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.ticketId}>
            {/* TODO: style each ticket as a ticket card (similar to BuyTickets ticket design) */}
            {/* TODO: show seat, ticket number, barcode, QR code, etc. */}
            <span>{ticket.ticketId}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
