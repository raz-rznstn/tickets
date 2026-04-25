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

export const deleteConcert = (id) =>
  fetch(`${baseServerUrl}/concerts/${id}`, { method: 'DELETE' }).then((res) => {
    if (!res.ok) throw new Error(`Server error ${res.status}`);
    return res.json();
  });

export const createConcert = (data) =>
  fetch(`${baseServerUrl}/concerts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then((res) => {
    if (!res.ok) throw new Error(`Server error ${res.status}`);
    return res.json();
  });

export const updateConcert = (id, data) =>
  fetch(`${baseServerUrl}/concerts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then((res) => {
    if (!res.ok) throw new Error(`Server error ${res.status}`);
    return res.json();
  });

export const fetchStats = () =>
  fetch(`${baseServerUrl}/stats`).then((res) => {
    if (!res.ok) throw new Error(`Server error ${res.status}`);
    return res.json();
  });

export const fetchMyOrders = () =>
  fetch(`${baseServerUrl}/orders`, { credentials: 'include' }).then((res) => {
    if (!res.ok) throw new Error(`Server error ${res.status}`);
    return res.json();
  });

export const fetchOrderById = (orderId) =>
  fetch(`${baseServerUrl}/orders/${orderId}`, { credentials: 'include' }).then((res) => {
    if (!res.ok) throw new Error(`Server error ${res.status}`);
    return res.json();
  });

export const validateTicket = ({ transactionId, lastFourDigits }) =>
  fetch(`${baseServerUrl}/validator/validate`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ transactionId, lastFourDigits }),
  }).then((res) => {
    if (!res.ok) throw new Error(`Server error ${res.status}`);
    return res.json();
  });
