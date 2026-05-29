import { useState, useCallback, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { styles } from './BuyTickets.styles';
import { useGetConcert } from '../../services/api/hooks/useConcert';
import { createCheckoutSession, fetchSessionStatus } from '../../services/api/api';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import TicketCard from '../../components/TicketCard/TicketCard';

const stripePromise = loadStripe("pk_test_51TT5siLAOkyP8xoUYDmgThoaRcsCiha3Qa4UnBHvM0Nl3c7LnJ7rNjUsTocNEEEATXM7q42ae1W2zgXPQIDchOeH00R6f31Dcp");

// --- Return/Success page (route: /return) ---
export function BuyTicketsReturn() {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');
  const [tickets, setTickets] = useState([]);
  const [stripeSessionId, setStripeSessionId] = useState('');
  const [concertTitle, setConcertTitle] = useState('');
  const [concertDate, setConcertDate] = useState('');
  const [concertVenue, setConcertVenue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get('session_id');
    fetchSessionStatus(sessionId).then(data => {
      setStatus(data.status);
      setCustomerEmail(data.customer_email);
      setTickets(data.tickets || []);
      setStripeSessionId(data.stripe_session_id || sessionId || '');
      setConcertTitle(data.title || '');
      setConcertDate(data.date || '');
      setConcertVenue(data.venue || '');
    });
  }, []);

  if (status === 'open') {
    navigate('/checkout');
    return null;
  }

  return (
    <div style={styles.page}>
      <div style={styles.inner}>
        {status === 'complete' ? (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={styles.eyebrow}>Purchase Confirmed</p>
            <h1 style={styles.heading}>See you at the <span className="gradient-text">show.</span></h1>
            <p style={{ color: '#4A4A6A', margin: '0 0 2rem' }}>
              A confirmation will be sent to <strong>{customerEmail}</strong>. Show the QR code at entry.
            </p>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {tickets.map((t) => (
                <TicketCard
                  key={t.ticketId}
                  title={concertTitle}
                  date={concertDate}
                  venue={concertVenue}
                  ticketId={t.ticketId}
                  stripeSessionId={stripeSessionId}
                  status={t.status}
                />
              ))}
            </div>

            <button
              onClick={() => navigate('/my-orders')}
              style={{ ...styles.buyBtn, marginTop: '32px' }}
              className="btn-primary"
            >
              View My Orders
            </button>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '6rem 2rem', color: '#4A4A6A' }}>
            Loading...
          </div>
        )}
      </div>
    </div>
  );
}

// --- Main BuyTickets page (route: /concerts/:id/buy) ---
export default function BuyTickets() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: concert, isLoading, error } = useGetConcert(id);
  const location = useLocation();
  const quantity = location.state?.quantity || 1;

  const fetchClientSecret = useCallback(() => {
    return createCheckoutSession({
      title: concert?.title,
      price: concert?.price,
      concertId: concert?._id,
      quantity,
    }).then(data => data.clientSecret);
  }, [concert?.title, concert?.price, concert?._id]);

  if (isLoading) {
    return (
      <div style={styles.page}>
        <div style={{ textAlign: 'center', padding: '6rem 2rem', color: '#4A4A6A' }} className="loading-pulse">
          Preparing your ticket...
        </div>
      </div>
    );
  }

  if (!isLoading && concert?.availableSeats === 0) {
    navigate(`/concert/${id}`, { replace: true });
    return null;
  }

  if (error || !concert) {
    return (
      <div style={styles.page}>
        <div style={{ textAlign: 'center', padding: '6rem 2rem', color: '#4A4A6A' }}>
          Ticket not found.{' '}
          <button onClick={() => navigate('/')} style={{ color: '#FF2E63', background: 'none', border: 'none', cursor: 'pointer' }}>
            Go back
          </button>
        </div>
      </div>
    );
  }

  const ticketNumber = `TF-${concert.id}-${Date.now().toString().slice(-5)}`;

  return (
    <div style={styles.page}>
      <div className="glow-blob-pink" style={{ width: '500px', height: '400px', top: '-100px', left: '50%', transform: 'translateX(-50%)' }} />
      <div style={styles.inner}>

        <p style={styles.eyebrow}>Your Digital Ticket</p>
        <h1 style={styles.heading}>You're going <span className="gradient-text">live.</span></h1>

        {/* Ticket — unchanged */}
        <div style={styles.ticket}>
          <div style={styles.stub}>
            <div style={styles.stubDate}>{concert.date.split(',')[0]}</div>
            <div style={styles.stubYear}>{concert.date.split(',')[1]?.trim()}</div>
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
              <span style={styles.badge}>🎟️ On Sale</span>
            </div>
            <h2 style={styles.title}>{concert.title}</h2>
            <div style={styles.metaRow}>
              <div style={styles.metaItem}>
                <span style={styles.metaLabel}>Venue</span>
                <span style={styles.metaValue}>{concert.venue}</span>
              </div>
              <div style={styles.metaItem}>
                <span style={styles.metaLabel}>Date</span>
                <span style={styles.metaValue}>{concert.date}</span>
              </div>
              <div style={styles.metaItem}>
                <span style={styles.metaLabel}>Doors Open</span>
                <span style={styles.metaValue}>{concert.doorsOpen}</span>
              </div>
              <div style={styles.metaItem}>
                <span style={styles.metaLabel}>Price</span>
                <span style={styles.metaValueAccent}>{concert.price}</span>
              </div>
            </div>
            <div style={styles.ticketFooter}>
              <div style={styles.barcode}>
                {Array.from({ length: 30 }).map((_, i) => (
                  <div key={i} style={{ ...styles.bar, width: i % 3 === 0 ? '3px' : '2px', opacity: i % 5 === 0 ? 0.4 : 1 }} />
                ))}
              </div>
              <div style={styles.ticketNumber}>{ticketNumber}</div>
            </div>
          </div>

          <img src={concert.imageUrl} alt="" style={styles.bgImage} />
        </div>

        {/* Stripe Embedded Checkout — replaces the payment form */}
        <div style={styles.form}>
          <p style={styles.formTitle}>Payment Details</p>
          <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>

      </div>
    </div>
  );
}