import { useQuery } from '@tanstack/react-query';
import { styles } from './BuyTickets.styles';
import PageHeader from '../../components/PageHeader/PageHeader';
import EventCard from '../../components/EventCard/EventCard';

const fetchConcerts = () =>
  fetch('/api/concerts').then((res) => {
    if (!res.ok) throw new Error(`Server error ${res.status}`);
    return res.json();
  });

export default function BuyTickets() {
  const { data: events = [], isLoading, error } = useQuery({
    queryKey: ['concerts'],
    queryFn: fetchConcerts,
  });

  return (
    <div style={styles.page}>
      <div className="glow-blob-cyan" style={{ width: '500px', height: '300px', top: '-80px', left: '50%', transform: 'translateX(-50%)' }} />
      <div style={styles.inner}>
        <PageHeader title="🎟️ Upcoming Events" />
        {isLoading && <p style={{ color: '#4A4A6A' }} className="loading-pulse">Loading events...</p>}
        {error && <p style={{ color: '#FF2E63' }}>Error: {error.message}</p>}
        <div style={styles.grid}>
          {events.map((event) => (
            <EventCard key={event._id || event.title} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
