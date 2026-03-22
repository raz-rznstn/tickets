import { useNavigate } from 'react-router-dom';
import { styles } from './PageHeader.styles';

export default function PageHeader({ title, backTo = '/' }) {
  const navigate = useNavigate();

  return (
    <div style={styles.header}>
      <button style={styles.back} onClick={() => navigate(backTo)}>← Back</button>
      <h1 style={styles.title}>{title}</h1>
    </div>
  );
}
