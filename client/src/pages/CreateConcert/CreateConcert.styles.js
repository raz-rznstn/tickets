import { styles as common } from '../../styles/common.styles';

export const styles = {
  page: {
    ...common.page,
    position: 'relative',
    overflow: 'hidden',
  },
  inner: {
    maxWidth: '780px',
    margin: '0 auto',
    padding: '2rem 2rem 6rem',
    position: 'relative',
    zIndex: 1,
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
    paddingTop: '1rem',
  },
  eyebrow: { ...common.eyebrow, marginBottom: '0.75rem' },
  heading: {
    fontSize: '3rem',
    fontWeight: 900,
    letterSpacing: '-0.03em',
    lineHeight: 1.1,
    margin: '0 0 1rem',
  },
  sub: {
    fontSize: '1rem',
    color: '#4A4A6A',
    margin: 0,
  },
};
