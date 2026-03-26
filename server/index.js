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

app.get('/api/concerts/:id', (req, res) => {
  const concert = concerts.find((c) => c._id === req.params.id);
  if (!concert) return res.status(404).json({ message: 'Concert not found' });
  res.json(concert);
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
