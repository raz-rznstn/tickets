export const styles = {
  card: {
    backgroundColor: '#13131A',
    border: '1px solid #2A2A3D',
    borderRadius: '16px',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  banner: {
    height: '200px',
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    transition: 'transform 0.4s ease',
  },
  bannerOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(11,11,15,0.7) 0%, rgba(11,11,15,0.1) 60%, transparent 100%)',
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
