import { styles as common } from '../../styles/common.styles';
import { colors, fontSize, fontWeight, borderRadius, zIndex } from '../../styles/tokens';

export const styles = {
  page: {
    ...common.page,
    position: 'relative',
  },
  inner: {
    maxWidth: '960px',
    margin: '0 auto',
    padding: '40px 32px 96px',
    position: 'relative',
    zIndex: zIndex.raised,
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '32px',
    gap: '16px',
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  eyebrow: { ...common.eyebrow },
  heading: {
    fontSize: fontSize.display3,
    fontWeight: fontWeight.black,
    letterSpacing: '-0.02em',
    margin: 0,
    color: colors.textPrimary,
  },

  createBtn: {
    background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
    color: colors.textWhite,
    border: 'none',
    borderRadius: borderRadius.lg,
    padding: '12px 24px',
    fontWeight: fontWeight.black,
    fontSize: fontSize.base,
    cursor: 'pointer',
    letterSpacing: '1.6px',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },

  tableWrapper: {
    backgroundColor: colors.bgCard,
    border: `1px solid ${colors.borderDefault}`,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  thead: {
    borderBottom: `1px solid ${colors.borderDefault}`,
  },
  th: {
    ...common.sectionLabel,
    padding: '14px 20px',
    textAlign: 'left',
  },
  tr: {
    borderBottom: `1px solid ${colors.borderSubtle}`,
  },
  td: {
    padding: '16px 20px',
    fontSize: fontSize.xl,
    color: colors.textPrimary,
  },
  tdMuted: {
    padding: '16px 20px',
    fontSize: fontSize.xl,
    color: colors.textSecondary,
  },
  tdAccent: {
    padding: '16px 20px',
    fontSize: fontSize.xl,
    color: colors.primary,
    fontWeight: fontWeight.bold,
  },
  actions: {
    display: 'flex',
    gap: '8px',
    padding: '16px 20px',
  },
  editBtn: {
    background: 'none',
    border: `1px solid ${colors.borderDefault}`,
    borderRadius: borderRadius.sm,
    padding: '6px 14px',
    color: colors.textPrimary,
    fontSize: fontSize.sm,
    cursor: 'pointer',
    fontWeight: fontWeight.semibold,
    letterSpacing: '1.3px',
    textTransform: 'uppercase',
  },
  deleteBtn: {
    background: 'none',
    border: `1px solid ${colors.primaryBorder}`,
    borderRadius: borderRadius.sm,
    padding: '6px 14px',
    color: colors.primary,
    fontSize: fontSize.sm,
    cursor: 'pointer',
    fontWeight: fontWeight.semibold,
    letterSpacing: '1.3px',
    textTransform: 'uppercase',
  },

  empty: {
    textAlign: 'center',
    color: colors.textSecondary,
    padding: '64px 0',
    fontSize: fontSize.xl2,
  },
};
