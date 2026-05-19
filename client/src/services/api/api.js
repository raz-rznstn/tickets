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

// --- Stats ---

export const fetchStats = () =>
  fetch(`${baseServerUrl}/stats`).then((res) => {
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