import { styles as common } from '../../styles/common.styles';
import { colors, fontSize, fontWeight, borderRadius, zIndex } from '../../styles/tokens';

export const styles = {
  page: {
    ...common.page,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px 24px',
    position: 'relative',
    overflow: 'hidden',
  },
  inner: {
    width: '100%',
    maxWidth: '420px',
    position: 'relative',
    zIndex: zIndex.raised,
  },

  header: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  eyebrow: { ...common.eyebrow, marginBottom: '12px' },
  heading: {
    fontSize: fontSize.display2,
    fontWeight: fontWeight.black,
    letterSpacing: '-0.02em',
    lineHeight: 1.1,
    margin: '0 0 8px',
    color: colors.textPrimary,
  },
  sub: {
    fontSize: fontSize.lg,
    color: colors.textSecondary,
    margin: 0,
  },

  card: {
    backgroundColor: colors.bgCard,
    border: `1px solid ${colors.borderDefault}`,
    borderRadius: borderRadius.xxl,
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },

  fieldGroup: { ...common.fieldGroup },
  label: { ...common.label },
  input: { ...common.input },

  submitBtn: {
    background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
    color: colors.textWhite,
    border: 'none',
    borderRadius: borderRadius.lg,
    padding: '14px 24px',
    fontWeight: fontWeight.black,
    fontSize: fontSize.xl2,
    cursor: 'pointer',
    letterSpacing: '1.3px',
    textTransform: 'uppercase',
    width: '100%',
    marginTop: '4px',
  },

  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    margin: '4px 0',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    backgroundColor: colors.borderSubtle,
  },
  dividerText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    letterSpacing: '1.6px',
    textTransform: 'uppercase',
  },

  toggleBtn: {
    background: 'none',
    border: `1px solid ${colors.borderDefault}`,
    borderRadius: borderRadius.lg,
    padding: '13px 24px',
    color: colors.textPrimary,
    fontSize: fontSize.xl2,
    cursor: 'pointer',
    width: '100%',
    letterSpacing: '0.5px',
  },
  toggleHint: {
    textAlign: 'center',
    fontSize: fontSize.base,
    color: colors.textSecondary,
    marginTop: '16px',
  },
  toggleLink: {
    background: 'none',
    border: 'none',
    color: colors.primary,
    cursor: 'pointer',
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
    padding: 0,
    textDecoration: 'underline',
  },
};
