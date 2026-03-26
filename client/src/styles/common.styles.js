import { NAVBAR_HEIGHT } from '../constants';

export const styles = {
  page: {
    minHeight: `calc(100vh - ${NAVBAR_HEIGHT})`,
    fontFamily: "'Inter', sans-serif",
    backgroundColor: '#0B0B0F',
    color: '#EAEAEA',
  },
  eyebrow: {
    fontSize: '0.72rem',
    fontWeight: 700,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#4A4A6A',
  },
  sectionLabel: {
    fontSize: '0.7rem',
    fontWeight: 700,
    color: '#4A4A6A',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
  },
  label: {
    fontSize: '0.72rem',
    fontWeight: 600,
    color: '#4A4A6A',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#0B0B0F',
    border: '1px solid #2A2A3D',
    borderRadius: '10px',
    padding: '0.8rem 1rem',
    color: '#EAEAEA',
    fontSize: '0.95rem',
    width: '100%',
    boxSizing: 'border-box',
    outline: 'none',
    appearance: 'none',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
};
