import { styles } from './SearchBar.styles';

export default function SearchBar({ value, onChange, onSubmit }) {
  return (
    <form style={styles.wrap} onSubmit={onSubmit}>
      <input
        style={styles.input}
        placeholder="Artist, concert name, or venue..."
        value={value}
        onChange={onChange}
        autoFocus
      />
      <button style={styles.btn} type="submit">Search</button>
    </form>
  );
}
