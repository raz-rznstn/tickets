export const NAVBAR_HEIGHT = '64px';

export const APP_BASE_URL = 'https://tickets-karp.onrender.com';

export const buildTransactionId = (stripeSessionId, ticketId) =>
  `${stripeSessionId}::${ticketId}`;

export const buildValidatorDeepLink = (stripeSessionId, ticketId) =>
  `${APP_BASE_URL}/validator?transaction_id=${encodeURIComponent(
    buildTransactionId(stripeSessionId, ticketId)
  )}`;
