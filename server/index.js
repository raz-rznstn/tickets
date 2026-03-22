require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { messages } = require('./mock/messages');
const { concerts } = require('./mock/concerts');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- Routes (using mock data) ---
app.get('/api/hello', (_req, res) => {
  res.json(messages[0]);
});

app.get('/api/concerts', (_req, res) => {
  res.json(concerts);
});

app.post('/api/concerts', (req, res) => {
  const concert = { ...req.body, id: Date.now() };
  concerts.push(concert);
  res.status(201).json(concert);
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
