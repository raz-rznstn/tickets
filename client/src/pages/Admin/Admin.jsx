import { useNavigate } from 'react-router-dom';
import { useGetConcertsList } from '../../services/api/hooks/useConcerts';

// TODO: import styles once designed

export default function Admin() {
  const navigate = useNavigate();
  const { data: concerts = [], isLoading, error } = useGetConcertsList();

  function handleEdit(concertId) {
    // TODO: open edit form (modal or inline) with the concert's current data
  }

  function handleDelete(concertId) {
    // TODO: call delete API then invalidate the concerts query
  }

  // TODO: handle loading state
  // TODO: handle error state

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {/* TODO: integrate CreateConcert form here (modal or inline) instead of navigating to /create */}
      <button onClick={() => navigate('/create')}>+ Create Event</button>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Venue</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {concerts.map((concert) => (
            <tr key={concert.id}>
              <td>{concert.title}</td>
              <td>{concert.date}</td>
              <td>{concert.venue}</td>
              <td>{concert.price}</td>
              <td>
                <button onClick={() => handleEdit(concert.id)}>Edit</button>
                <button onClick={() => handleDelete(concert.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
