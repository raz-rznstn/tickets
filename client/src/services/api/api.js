const baseServerUrl = '/api';

export const fetchConcerts = () =>
  fetch(`${baseServerUrl}/concerts`).then((res) => {
    if (!res.ok) throw new Error(`Server error ${res.status}`);
    return res.json();
  });

export const fetchConcertById = (id) =>
  fetch(`${baseServerUrl}/concerts/${id}`).then((res) => {
    if (!res.ok) throw new Error(`Server error ${res.status}`);
    return res.json();
  });

export const fetchStats = () =>
  fetch(`${baseServerUrl}/stats`).then((res) => {
    if (!res.ok) throw new Error(`Server error ${res.status}`);
    return res.json();
  });

export const fetchMyOrders = () =>
  // TODO: credentials: 'include' requires CORS to be configured on the server first
  fetch(`${baseServerUrl}/orders`, { credentials: 'include' }).then((res) => {
    if (!res.ok) throw new Error(`Server error ${res.status}`);
    return res.json();
  });

export const fetchOrderById = (orderId) =>
  // TODO: credentials: 'include' requires CORS to be configured on the server first
  fetch(`${baseServerUrl}/orders/${orderId}`, { credentials: 'include' }).then((res) => {
    if (!res.ok) throw new Error(`Server error ${res.status}`);
    return res.json();
  });

export const validateTicket = ({ transactionId, lastFourDigits }) =>
  // TODO: credentials: 'include' requires CORS to be configured on the server first
  fetch(`${baseServerUrl}/validator/validate`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ transactionId, lastFourDigits }),
  }).then((res) => {
    if (!res.ok) throw new Error(`Server error ${res.status}`);
    return res.json();
  });
