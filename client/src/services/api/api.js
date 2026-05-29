const baseServerUrl = '/api';

// --- Concerts ---

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
  fetch(`${baseServerUrl}/concerts/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  }).then((res) => {
    if (!res.ok) throw new Error(`Server error ${res.status}`);
    return res.json();
  });

export const createConcert = (data) =>
  fetch(`${baseServerUrl}/concerts`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then((res) => {
    if (!res.ok) throw new Error(`Server error ${res.status}`);
    return res.json();
  });

export const updateConcert = (id, data) =>
  fetch(`${baseServerUrl}/concerts/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then((res) => {
    if (!res.ok) throw new Error(`Server error ${res.status}`);
    return res.json();
  });

// --- Orders ---

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

// --- Validator ---

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

// --- Auth ---

export const fetchMe = () =>
  fetch(`${baseServerUrl}/auth/me`, {
    credentials: 'include',
  }).then((res) => {
    if (!res.ok) throw new Error(`Server error ${res.status}`);
    return res.json();
  });

export const loginUser = ({ email, password }) =>
  fetch(`${baseServerUrl}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (!res.ok) return res.json().then(data => Promise.reject(data));
    return res.json();
  });

export const registerUser = ({ name, email, password }) =>
  fetch(`${baseServerUrl}/auth/register`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  }).then((res) => {
    if (!res.ok) return res.json().then(data => Promise.reject(data));
    return res.json();
  });

export const logoutUser = () =>
  fetch(`${baseServerUrl}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  }).then((res) => {
    if (!res.ok) throw new Error(`Server error ${res.status}`);
    return res.json();
  });

// --- Stripe ---

export const createCheckoutSession = (data) =>
  fetch(`${baseServerUrl}/create-checkout-session`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then((res) => {
    if (!res.ok) throw new Error(`Server error ${res.status}`);
    return res.json();
  });

export const fetchSessionStatus = (sessionId) =>
  fetch(`${baseServerUrl}/session-status?session_id=${sessionId}`, {
    credentials: 'include',
  }).then((res) => {
    if (!res.ok) throw new Error(`Server error ${res.status}`);
    return res.json();
  });