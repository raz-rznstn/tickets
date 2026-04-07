import { useNavigate } from 'react-router-dom';
import { useGetMyOrders } from '../../services/api/hooks/useMyOrders';

// TODO: import styles once designed

export default function MyOrders() {
  const navigate = useNavigate();

  const { data: orders = [], isLoading, error } = useGetMyOrders();

  // TODO: handle loading state
  // TODO: handle error state
  // TODO: show empty state when no orders

  return (
    <div>
      <h1>My Orders</h1>

      <ul>
        {orders.map((order) => (
          <li key={order.orderId} onClick={() => navigate(`/my-orders/${order.orderId}`)} style={{ cursor: 'pointer' }}>
            {/* TODO: style as a card */}
            <span>{order.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
