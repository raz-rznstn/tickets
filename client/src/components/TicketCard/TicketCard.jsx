import { QRCodeSVG } from 'qrcode.react';
import { styles } from './TicketCard.styles';
import { buildValidatorDeepLink } from '../../constants';

export default function TicketCard({
  title,
  date,
  venue,
  ticketId,
  stripeSessionId,
  status,
}) {
  const [day, year] = (date || '').split(',');
  const deepLink =
    stripeSessionId && ticketId
      ? buildValidatorDeepLink(stripeSessionId, ticketId)
      : null;
  const isRedeemed = status === 'redeemed';

  return (
    <div style={styles.ticket}>
      <div style={styles.stub}>
        <div style={styles.stubDate}>{day || ''}</div>
        <div style={styles.stubYear}>{year?.trim() || ''}</div>
        <div style={styles.stubDivider} />
        <div style={styles.stubSeat}>GA</div>
        <div style={styles.stubSeatLabel}>General<br />Admission</div>
      </div>

      <div style={styles.perforation}>
        <div style={styles.circleTop} />
        <div style={styles.dashedLine} />
        <div style={styles.circleBottom} />
      </div>

      <div style={styles.body}>
        <div style={styles.bodyTop}>
          <span style={styles.genre}>Live Music</span>
          <span style={styles.badge}>{isRedeemed ? 'Redeemed' : 'Admit One'}</span>
        </div>
        <h2 style={styles.title}>{title}</h2>
        <div style={styles.metaRow}>
          {venue && (
            <div style={styles.metaItem}>
              <span style={styles.metaLabel}>Venue</span>
              <span style={styles.metaValue}>{venue}</span>
            </div>
          )}
          {date && (
            <div style={styles.metaItem}>
              <span style={styles.metaLabel}>Date</span>
              <span style={styles.metaValue}>{date}</span>
            </div>
          )}
        </div>

        <div style={styles.ticketFooter}>
          {deepLink ? (
            <div style={styles.qrWrap}>
              <QRCodeSVG value={deepLink} size={96} level="M" includeMargin={false} />
            </div>
          ) : (
            <span style={styles.ticketNumber}>QR pending…</span>
          )}
          <div>
            <div style={styles.ticketNumber}>{ticketId}</div>
            <div style={styles.scanHint}>Scan at entry</div>
          </div>
        </div>
      </div>
    </div>
  );
}
