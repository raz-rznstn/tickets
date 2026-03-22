export const styles = {
  card: {
    backgroundColor: '#13131A',
    border: '1px solid #2A2A3D',
    borderRadius: '16px',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  banner: {
    height: '190px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '4rem',
    position: 'relative',
    overflow: 'hidden',
  },
  bannerOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(0,0,0,0.2)',
  },
  emoji: {
    position: 'relative',
    zIndex: 1,
    filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))',
  },
  body: {
    padding: '1.2rem 1.4rem 1.4rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: '1rem',
  },
  info: { flex: 1, minWidth: 0 },
  title: {
    fontSize: '1.05rem',
    fontWeight: 700,
    color: '#EAEAEA',
    marginBottom: '0.4rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    transition: 'color 0.2s ease',
  },
  meta: {
    fontSize: '0.78rem',
    color: '#4A4A6A',
    lineHeight: 1.75,
  },
  price: {
    fontSize: '1.25rem',
    fontWeight: 900,
    color: '#FF2E63',
    flexShrink: 0,
  },
};

export const bannerGradients = [
  'linear-gradient(135deg, #1a0020 0%, #FF2E63 100%)',
  'linear-gradient(135deg, #001a20 0%, #08D9D6 100%)',
  'linear-gradient(135deg, #1a1500 0%, #F9ED69 100%)',
  'linear-gradient(135deg, #0d0025 0%, #7c3aed 100%)',
  'linear-gradient(135deg, #001510 0%, #10b981 100%)',
  'linear-gradient(135deg, #1a0015 0%, #FF2E63 50%, #F9ED69 100%)',
];
