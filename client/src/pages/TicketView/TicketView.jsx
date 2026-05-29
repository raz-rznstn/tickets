import { useParams, useNavigate } from 'react-router-dom';
import { useGetOrder } from '../../services/api/hooks/useOrder';
import TicketCard from '../../components/TicketCard/TicketCard';

export default function TicketView() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const { data: order, isLoading, error } = useGetOrder(orderId);

  if (isLoading) {
    return (
      <div style={{ padding: '4rem 2rem', textAlign: 'center', color: '#4A4A6A' }}>
        Loading ticket…
      </div>
    );
  }

  if (error || !order) {
    return (
      <div style={{ padding: '4rem 2rem', textAlign: 'center', color: '#4A4A6A' }}>
        Order not found.{' '}
        <button onClick={() => navigate('/my-orders')} style={{ color: '#FF2E63', background: 'none', border: 'none', cursor: 'pointer' }}>
          Back to My Orders
        </button>
      </div>
    );
  }

  const tickets = order.tickets ?? [];

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', padding: '32px 24px' }}>
      <button
        onClick={() => navigate('/my-orders')}
        style={{ background: 'none', border: 'none', color: '#FF2E63', cursor: 'pointer', marginBottom: '16px' }}
      >
        ← Back to My Orders
      </button>

      <h1 style={{ marginBottom: '24px' }}>{order.title ?? orderId}</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket.ticketId}
            title={order.title}
            date={order.date}
            venue={order.venue}
            ticketId={ticket.ticketId}
            stripeSessionId={order.stripeSessionId}
            status={ticket.status}
          />
        ))}
      </div>
    </div>
  );
}
