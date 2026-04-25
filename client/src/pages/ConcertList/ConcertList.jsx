import { useNavigate } from 'react-router-dom';
import { useGetConcertsList } from '../../services/api/hooks/useConcerts';
import { useDeleteConcert } from '../../services/api/hooks/useDeleteConcert';
import { styles } from './ConcertList.styles';

export default function ConcertList() {
  const navigate = useNavigate();
  const { data: concerts = [], isLoading, error } = useGetConcertsList();
  const deleteMutation = useDeleteConcert();

  function handleDelete(concertId, title) {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    deleteMutation.mutate(concertId);
  }

  return (
    <div style={styles.page}>
      <div style={styles.inner}>
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <p style={styles.eyebrow}>Management</p>
            <h1 style={styles.heading}>Concert List</h1>
          </div>
          <button style={styles.createBtn} onClick={() => navigate('/create')}>
            + Create Event
          </button>
        </div>

        {isLoading && <p style={{ color: '#4A4A6A', padding: '2rem 0' }}>Loading concerts…</p>}
        {error && <p style={{ color: '#FF2E63', padding: '2rem 0' }}>Failed to load concerts.</p>}

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                <th style={styles.th}>Title</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Venue</th>
                <th style={styles.th}>Price</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && concerts.length === 0 ? (
                <tr>
                  <td colSpan={5} style={styles.empty}>No events yet.</td>
                </tr>
              ) : (
                concerts.map((concert) => (
                  <tr key={concert.id} style={styles.tr}>
                    <td style={styles.td}>{concert.title}</td>
                    <td style={styles.tdMuted}>{concert.date}</td>
                    <td style={styles.tdMuted}>{concert.venue}</td>
                    <td style={styles.tdAccent}>{concert.price}</td>
                    <td style={{ padding: 0 }}>
                      <div style={styles.actions}>
                        <button style={styles.editBtn} onClick={() => navigate(`/edit/${concert.id}`)}>Edit</button>
                        <button
                          style={styles.deleteBtn}
                          onClick={() => handleDelete(concert.id, concert.title)}
                          disabled={deleteMutation.isPending}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
