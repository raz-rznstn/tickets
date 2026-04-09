import { styles as common } from '../../styles/common.styles';
import { colors, fontSize, fontWeight, borderRadius, zIndex } from '../../styles/tokens';

export const styles = {
  page: {
    ...common.page,
    position: 'relative',
    overflow: 'hidden',
  },
  inner: {
    maxWidth: '780px',
    margin: '0 auto',
    padding: '32px 32px 96px',
    position: 'relative',
    zIndex: zIndex.raised,
  },

  backBtn: {
    background: 'none',
    border: `1px solid ${colors.borderDefault}`,
    borderRadius: borderRadius.lg,
    padding: '8px 16px',
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    cursor: 'pointer',
    letterSpacing: '1.3px',
    textTransform: 'uppercase',
    fontWeight: fontWeight.semibold,
    marginBottom: '24px',
    display: 'inline-block',
  },

  header: {
    textAlign: 'center',
    marginBottom: '48px',
    paddingTop: '8px',
  },
  eyebrow: { ...common.eyebrow, marginBottom: '12px' },
  heading: {
    fontSize: fontSize.display5,
    fontWeight: fontWeight.black,
    letterSpacing: '-0.03em',
    lineHeight: 1.1,
    margin: '0 0 16px',
    color: colors.textPrimary,
  },
  sub: {
    fontSize: fontSize.xl2,
    color: colors.textSecondary,
    margin: 0,
  },

  loading: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: fontSize.xl2,
    padding: '96px 0',
  },
  error: {
    textAlign: 'center',
    color: colors.primary,
    fontSize: fontSize.xl2,
    padding: '96px 0',
  },
};
