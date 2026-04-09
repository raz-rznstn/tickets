import { useParams, useNavigate } from 'react-router-dom';
import { useGetConcert } from '../../services/api/hooks/useConcert';
import { styles } from './EditConcert.styles';
import ConcertForm from '../../components/ConcertForm/ConcertForm';

export default function EditConcert() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: concert, isLoading, error } = useGetConcert(id);

  return (
    <div style={styles.page}>
      <div className="glow-blob-pink" style={{ width: '500px', height: '350px', top: '-100px', left: '50%', transform: 'translateX(-50%)' }} />
      <div className="glow-blob-cyan" style={{ width: '350px', height: '250px', top: '300px', right: '-80px' }} />
      <div style={styles.inner}>
        <button style={styles.backBtn} onClick={() => navigate('/admin')}>
          ← Back to Concert List
        </button>

        <div style={styles.header}>
          <p style={styles.eyebrow}>Management</p>
          <h1 style={styles.heading}>
            Edit your <span className="gradient-text">concert.</span>
          </h1>
          <p style={styles.sub}>Update the details below — changes go live immediately.</p>
        </div>

        {isLoading && <p style={styles.loading}>Loading concert…</p>}
        {error && <p style={styles.error}>Failed to load concert.</p>}
        {concert && <ConcertForm initialValues={concert} submitLabel="💾 Save Changes" />}
      </div>
    </div>
  );
}
