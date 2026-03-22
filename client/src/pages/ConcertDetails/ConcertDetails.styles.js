export const styles = {
  page: {
    minHeight: '100vh',
    fontFamily: "'Inter', sans-serif",
    backgroundColor: '#0B0B0F',
    color: '#EAEAEA',
  },

  // --- Hero image ---
  heroWrap: {
    position: 'relative',
    height: '480px',
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  heroOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, #0B0B0F 0%, rgba(11,11,15,0.5) 50%, rgba(11,11,15,0.1) 100%)',
  },
  backBtn: {
    position: 'absolute',
    top: '1.5rem',
    left: '2rem',
    background: 'rgba(11,11,15,0.7)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#EAEAEA',
    borderRadius: '8px',
    padding: '0.5rem 1rem',
    fontSize: '0.85rem',
    cursor: 'pointer',
    zIndex: 10,
  },
  heroBadge: {
    position: 'absolute',
    top: '1.5rem',
    right: '2rem',
    background: 'linear-gradient(135deg, #FF2E63, #e0196b)',
    color: '#fff',
    borderRadius: '999px',
    padding: '0.4rem 1rem',
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    zIndex: 10,
  },

  // --- Content ---
  content: {
    maxWidth: '820px',
    margin: '0 auto',
    padding: '0 2rem 6rem',
    marginTop: '-80px',
    position: 'relative',
    zIndex: 1,
  },
  title: {
    fontSize: '2.8rem',
    fontWeight: 900,
    color: '#EAEAEA',
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
    marginBottom: '1.2rem',
  },

  // --- Meta row ---
  metaRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.2rem',
    marginBottom: '2.5rem',
  },
  metaChip: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#13131A',
    border: '1px solid #2A2A3D',
    borderRadius: '8px',
    padding: '0.55rem 1rem',
    fontSize: '0.85rem',
    color: '#EAEAEA',
  },
  metaChipIcon: {
    fontSize: '1rem',
  },

  // --- Divider ---
  divider: {
    height: '1px',
    backgroundColor: '#1C1C28',
    margin: '2rem 0',
  },

  // --- About section ---
  sectionLabel: {
    fontSize: '0.7rem',
    fontWeight: 700,
    color: '#4A4A6A',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    marginBottom: '0.8rem',
  },
  aboutText: {
    fontSize: '1rem',
    color: '#8A8AA0',
    lineHeight: 1.8,
    marginBottom: '2.5rem',
  },

  // --- Highlights ---
  highlights: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
    marginBottom: '2.5rem',
  },
  highlightCard: {
    backgroundColor: '#13131A',
    border: '1px solid #2A2A3D',
    borderRadius: '12px',
    padding: '1.2rem',
    textAlign: 'center',
  },
  highlightIcon: {
    fontSize: '1.5rem',
    marginBottom: '0.5rem',
  },
  highlightLabel: {
    fontSize: '0.72rem',
    color: '#4A4A6A',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    marginBottom: '0.25rem',
  },
  highlightValue: {
    fontSize: '0.95rem',
    fontWeight: 700,
    color: '#EAEAEA',
  },

  // --- Buy section ---
  buySection: {
    backgroundColor: '#13131A',
    border: '1px solid #2A2A3D',
    borderRadius: '16px',
    padding: '1.8rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '2rem',
  },
  priceBlock: {},
  priceLabel: {
    fontSize: '0.72rem',
    color: '#4A4A6A',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    marginBottom: '0.3rem',
  },
  priceValue: {
    fontSize: '2.5rem',
    fontWeight: 900,
    color: '#FF2E63',
    lineHeight: 1,
  },
  priceNote: {
    fontSize: '0.75rem',
    color: '#4A4A6A',
    marginTop: '0.3rem',
  },
  buyBtn: {
    background: 'linear-gradient(135deg, #FF2E63, #e0196b)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    padding: '1rem 3rem',
    fontWeight: 900,
    fontSize: '1rem',
    cursor: 'pointer',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
};
