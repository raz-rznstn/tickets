import { styles as common } from '../../styles/common.styles';
import { colors, fontSize, fontWeight, borderRadius } from '../../styles/tokens';

export const styles = {
  page: { ...common.page },

  header: {
    padding: '64px 24px 48px',
    maxWidth: '760px',
    margin: '0 auto',
  },
  eyebrow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    letterSpacing: '4px',
    textTransform: 'uppercase',
    color: colors.primary,
    marginBottom: '16px',
  },
  eyebrowLine: {
    width: '32px',
    height: '1px',
    backgroundColor: colors.primary,
    opacity: 0.5,
    display: 'inline-block',
  },
  pageTitle: {
    fontSize: fontSize.display3,
    fontWeight: fontWeight.black,
    color: colors.textPrimary,
    letterSpacing: '-0.02em',
    lineHeight: 1.1,
    margin: 0,
  },

  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    maxWidth: '760px',
    margin: '0 auto 24px',
    padding: '0 24px',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    backgroundColor: colors.borderDefault,
  },
  dividerDots: {
    fontSize: fontSize.xxs,
    color: colors.primary,
    letterSpacing: '6.4px',
    opacity: 0.7,
  },

  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    maxWidth: '760px',
    margin: '0 auto 19px',
    padding: '0 24px',
  },
  sectionLabel: { ...common.sectionLabel, whiteSpace: 'nowrap' },
  sectionLine: {
    flex: 1,
    height: '1px',
    backgroundColor: colors.borderDefault,
  },
  count: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    whiteSpace: 'nowrap',
  },

  listSection: {
    maxWidth: '760px',
    margin: '0 auto',
    padding: '0 24px 96px',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },

  card: {
    backgroundColor: colors.bgCard,
    border: `1px solid ${colors.borderDefault}`,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    cursor: 'pointer',
    display: 'flex',
  },
  cardAccent: {
    width: '4px',
    flexShrink: 0,
    backgroundColor: colors.primary,
  },
  cardBody: {
    flex: 1,
    padding: '20px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
  },
  cardInfo: {
    flex: 1,
    minWidth: 0,
  },
  cardTitle: {
    fontSize: fontSize.xl3,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: '6px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  cardMeta: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    lineHeight: 1.75,
  },
  cardBadge: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    letterSpacing: '1.3px',
    textTransform: 'uppercase',
    backgroundColor: colors.primaryBg,
    color: colors.primary,
    border: `1px solid ${colors.primaryBorder}`,
    borderRadius: borderRadius.full,
    padding: '4px 14px',
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },

  loading: {
    textAlign: 'center',
    color: colors.textSecondary,
    padding: '64px 0',
    fontSize: fontSize.xl2,
  },
  error: {
    textAlign: 'center',
    color: colors.primary,
    padding: '64px 0',
    fontSize: fontSize.xl2,
  },
  empty: {
    textAlign: 'center',
    color: colors.textSecondary,
    padding: '64px 0',
    fontSize: fontSize.xl2,
  },
  emptyHint: {
    display: 'block',
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginTop: '8px',
  },
};
