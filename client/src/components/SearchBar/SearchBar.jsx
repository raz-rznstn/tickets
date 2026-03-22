import { styles } from './SearchBar.styles';

export default function SearchBar({ value, onChange, onSubmit }) {
  return (
    <form style={styles.wrap} className="search-wrap" onSubmit={onSubmit}>
      <input
        style={styles.input}
        placeholder="Search artist, concert or venue..."
        value={value}
        onChange={onChange}
        autoFocus
      />
      <button style={styles.btn} className="btn-primary" type="submit">
        Search
      </button>
    </form>
  );
}
