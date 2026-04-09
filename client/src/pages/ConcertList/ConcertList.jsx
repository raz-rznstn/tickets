import { useNavigate } from 'react-router-dom';
import { useGetConcertsList } from '../../services/api/hooks/useConcerts';
import { styles } from './ConcertList.styles';

export default function ConcertList() {
  const navigate = useNavigate();
  const { data: concerts = [], isLoading, error } = useGetConcertsList();

  function handleDelete(concertId) {
    // TODO: call delete API then invalidate the concerts query
  }

  // TODO: handle loading state
  // TODO: handle error state

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
              {concerts.length === 0 ? (
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
                        <button style={styles.deleteBtn} onClick={() => handleDelete(concert.id)}>Delete</button>
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
