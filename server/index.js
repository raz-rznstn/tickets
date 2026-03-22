require('dotenv').config();
const express = require('express');
const cors = require('cors');

const concertsRouter = require('./routes/concerts');
const statsRouter = require('./routes/stats');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- Routes ---
app.use('/api/concerts', concertsRouter);
app.use('/api/stats', statsRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
