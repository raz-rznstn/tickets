import { useNavigate } from 'react-router-dom';
import { useGetMyOrders } from '../../services/api/hooks/useMyOrders';
import { styles } from './MyOrders.styles';

export default function MyOrders() {
  const navigate = useNavigate();
  const { data: orders = [], isLoading, error } = useGetMyOrders();

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div style={styles.eyebrow}>
          <span style={styles.eyebrowLine} />
          Your Account
          <span style={styles.eyebrowLine} />
        </div>
        <h1 style={styles.pageTitle}>My Orders</h1>
      </div>

      <div style={styles.divider}>
        <span style={styles.dividerLine} />
        <span style={styles.dividerDots}>◆ ◆ ◆</span>
        <span style={styles.dividerLine} />
      </div>

      <div style={styles.sectionHeader}>
        <span style={styles.sectionLabel}>Purchase History</span>
        <span style={styles.sectionLine} />
        {!isLoading && !error && (
          <span style={styles.count}>
            {orders.length} order{orders.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      <div style={styles.listSection}>
        {isLoading && (
          <div style={styles.loading} className="loading-pulse">Loading orders…</div>
        )}

        {!isLoading && error && (
          <div style={styles.error}>Failed to load orders.</div>
        )}

        {!isLoading && !error && orders.length === 0 && (
          <div style={styles.empty}>
            No orders yet.
            <span style={styles.emptyHint}>Browse events and grab your first ticket!</span>
          </div>
        )}

        {!isLoading && !error && orders.length > 0 && (
          <div style={styles.list}>
            {orders.map((order) => (
              <div
                key={order.orderId}
                style={styles.card}
                className="card-hover"
                onClick={() => navigate(`/my-orders/${order.orderId}`)}
              >
                <div style={styles.cardAccent} />
                <div style={styles.cardBody}>
                  <div style={styles.cardInfo}>
                    <div style={styles.cardTitle}>{order.title}</div>
                    <div style={styles.cardMeta}>
                      📅 {order.date ?? '—'}<br />
                      📍 {order.venue ?? '—'}
                    </div>
                  </div>
                  <div style={styles.cardBadge}>
                    {order.tickets.length} ticket{order.tickets.length !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
