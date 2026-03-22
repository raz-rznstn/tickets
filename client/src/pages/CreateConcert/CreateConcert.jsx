import { styles } from './CreateConcert.styles';
import PageHeader from '../../components/PageHeader/PageHeader';
import ConcertForm from '../../components/ConcertForm/ConcertForm';

export default function CreateConcert() {
  return (
    <div style={styles.page}>
      <div className="glow-blob-pink" style={{ width: '400px', height: '300px', top: '-80px', left: '25%' }} />
      <div style={styles.inner}>
        <PageHeader title="🎤 Create a Concert" />
        <ConcertForm />
      </div>
    </div>
  );
}
