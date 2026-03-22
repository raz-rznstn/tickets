import { styles } from './CreateConcert.styles';
import PageHeader from '../components/PageHeader';
import ConcertForm from '../components/ConcertForm';

export default function CreateConcert() {
  return (
    <div style={styles.page}>
      <PageHeader title="🎤 Create a Concert" />
      <ConcertForm />
    </div>
  );
}
