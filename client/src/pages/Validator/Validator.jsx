import { useState } from 'react';
import { useValidateTicket } from '../../services/api/hooks/useValidateTicket';
import { styles } from './Validator.styles';

// TODO: wrap this page with ProtectedRoute role="validator" once auth context is implemented

export default function Validator() {
  const [transactionId, setTransactionId] = useState('');
  const [lastFourDigits, setLastFourDigits] = useState('');

  const { mutate: validate, data, isPending, error } = useValidateTicket();

  function handleScan() {
    // TODO: integrate QR scanner library
    // TODO: on successful scan, set transactionId with the decoded value from the QR code
    // The scanned value should be in the format: stripeSessionId::ticketId
    // setTransactionId(scannedValue);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!transactionId.includes('::')) {
      alert('Invalid transaction ID format');
      return;
    }
    if (!/^\d{4}$/.test(lastFourDigits)) {
      alert('Last 4 digits must be exactly 4 numbers');
      return;
    }

    validate({ transactionId, lastFourDigits });
  }

  return (
    <div style={styles.page}>
      <div className="glow-blob-cyan" style={{ width: '400px', height: '300px', top: '-80px', left: '50%', transform: 'translateX(-50%)' }} />
      <div style={styles.inner}>
        <div style={styles.header}>
          <p style={styles.eyebrow}>Staff Portal</p>
          <h1 style={styles.heading}>Ticket Validator</h1>
          <p style={styles.sub}>Scan a QR code or enter details manually.</p>
        </div>

        {/* QR Scanner */}
        <section style={styles.scanSection}>
          <p style={styles.scanLabel}>QR Scanner</p>
          <div style={styles.scanPlaceholder}>
            {transactionId ? transactionId : 'Camera preview'}
          </div>
          <button style={styles.scanBtn} onClick={handleScan}>Scan QR Code</button>
          {transactionId && <p style={styles.scannedId}>Scanned: {transactionId}</p>}
        </section>

        {/* Manual input */}
        <form style={styles.form} onSubmit={handleSubmit}>
          <p style={styles.formTitle}>Manual Entry</p>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Transaction ID</label>
            <input
              style={styles.input}
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="Scanned automatically from QR"
            />
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Last 4 digits of card</label>
            <input
              style={styles.input}
              value={lastFourDigits}
              onChange={(e) => setLastFourDigits(e.target.value)}
              maxLength={4}
              placeholder="e.g. 4242"
            />
          </div>
          <button
            type="submit"
            style={{ ...styles.submitBtn, ...(isPending ? styles.submitBtnDisabled : {}) }}
            disabled={isPending}
          >
            {isPending ? 'Validating…' : 'Validate Ticket'}
          </button>
        </form>

        {/* Result */}
        {data && (
          <div style={data.valid ? styles.resultValid : styles.resultInvalid}>
            {data.valid
              ? `✓ Ticket is Valid${data.remaining > 0 ? ` — ${data.remaining} ticket(s) remaining` : ''}`
              : `✗ Ticket is Invalid — ${data.reason}`}
          </div>
        )}
        {error && <div style={styles.resultError}>Error: {error.message}</div>}
      </div>
    </div>
  );
}