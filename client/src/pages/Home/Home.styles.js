import { NAVBAR_HEIGHT } from '../../constants';

export const styles = {
  page: {
    minHeight: `calc(100vh - ${NAVBAR_HEIGHT})`,
    fontFamily: "'Inter', sans-serif",
    backgroundColor: '#0B0B0F',
    color: '#EAEAEA',
  },

  // Hero
  heroSection: {
    position: 'relative',
    textAlign: 'center',
    padding: '6rem 1.5rem 4rem',
    overflow: 'hidden',
  },
  heroEyebrow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    fontSize: '0.72rem',
    fontWeight: 700,
    color: '#FF2E63',
    letterSpacing: '0.35em',
    textTransform: 'uppercase',
    marginBottom: '1.5rem',
  },
  eyebrowLine: {
    width: '32px',
    height: '1px',
    backgroundColor: '#FF2E63',
    opacity: 0.5,
    display: 'inline-block',
  },
  heroTitle: {
    fontSize: '4rem',
    fontWeight: 900,
    lineHeight: 1.1,
    marginBottom: '1rem',
    letterSpacing: '-0.02em',
    color: '#EAEAEA',
  },
  heroSub: {
    fontSize: '0.85rem',
    color: '#4A4A6A',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    marginBottom: '2.5rem',
  },

  // Stats
  statsSection: {
    maxWidth: '760px',
    margin: '0 auto 4rem',
    padding: '0 1.5rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    border: '1px solid #2A2A3D',
    borderRadius: '16px',
    overflow: 'hidden',
  },
  statItem: {
    textAlign: 'center',
    padding: '1.5rem 1rem',
    borderRight: '1px solid #2A2A3D',
  },
  statItemLast: {
    textAlign: 'center',
    padding: '1.5rem 1rem',
  },
  statNumber: {
    fontSize: '1.6rem',
    fontWeight: 900,
    display: 'block',
    marginBottom: '0.2rem',
  },
  statLabel: {
    fontSize: '0.68rem',
    color: '#4A4A6A',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
  },

  // Divider
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    maxWidth: '760px',
    margin: '0 auto 2rem',
    padding: '0 1.5rem',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    backgroundColor: '#2A2A3D',
  },
  dividerDots: {
    fontSize: '0.55rem',
    color: '#FF2E63',
    letterSpacing: '0.4em',
    opacity: 0.7,
  },

  // Section header
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    maxWidth: '760px',
    margin: '0 auto 1.2rem',
    padding: '0 1.5rem',
  },
  sectionLabel: {
    fontSize: '0.7rem',
    fontWeight: 700,
    color: '#4A4A6A',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
  },
  sectionLine: {
    flex: 1,
    height: '1px',
    backgroundColor: '#2A2A3D',
  },
  resultCount: {
    fontSize: '0.7rem',
    color: '#4A4A6A',
    whiteSpace: 'nowrap',
  },

  // Listings
  listSection: {
    maxWidth: '760px',
    margin: '0 auto',
    padding: '0 1.5rem 6rem',
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  empty: {
    textAlign: 'center',
    color: '#2A2A3D',
    padding: '4rem 0',
    fontSize: '1rem',
  },

  // Footer
  footer: {
    borderTop: '1px solid #1C1C28',
    padding: '1.5rem 2.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLogo: {
    fontSize: '0.85rem',
    fontWeight: 900,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
  },
  footerCopy: {
    fontSize: '0.7rem',
    color: '#2A2A3D',
    letterSpacing: '0.08em',
  },
};
