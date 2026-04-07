import { useState } from 'react';
import { useValidateTicket } from '../../services/api/hooks/useValidateTicket';

// TODO: import styles once designed
// TODO: wrap this page with ProtectedRoute role="validator" once auth context is implemented

export default function Validator() {
  const [transactionId, setTransactionId] = useState('');
  const [lastFourDigits, setLastFourDigits] = useState('');

  const { mutate: validate, data, isPending, error } = useValidateTicket();

  function handleScan() {
    // TODO: integrate QR scanner library
    // TODO: on successful scan, set transactionId with the decoded value from the QR code
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: add input validation before submitting
    validate({ transactionId, lastFourDigits });
  }

  return (
    <div>
      <h1>Ticket Validator</h1>

      {/* QR Scanner */}
      <section>
        {/* TODO: render QR scanner component here */}
        <button onClick={handleScan}>Scan QR Code</button>
        {transactionId && <p>Scanned: {transactionId}</p>}
      </section>

      {/* Manual input */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Transaction ID</label>
          <input
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            placeholder="Scanned automatically from QR"
          />
        </div>
        <div>
          <label>Last 4 digits of card</label>
          <input
            value={lastFourDigits}
            onChange={(e) => setLastFourDigits(e.target.value)}
            maxLength={4}
            placeholder="e.g. 4242"
          />
        </div>
        <button type="submit" disabled={isPending}>
          {isPending ? 'Validating...' : 'Validate Ticket'}
        </button>
      </form>

      {/* Result */}
      {/* TODO: style result clearly */}
      {data && <p>{data.valid ? 'Ticket is valid' : 'Ticket is invalid'}</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
