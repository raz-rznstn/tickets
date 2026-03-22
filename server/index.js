require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern-hello-world';

// Middleware
app.use(cors());
app.use(express.json());

// --- Mongoose Schema & Model ---
const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model('Message', messageSchema);

// --- Seed function ---
async function seedDatabase() {
  const count = await Message.countDocuments();
  if (count === 0) {
    await Message.create({ message: 'Hello World from MongoDB!' });
    console.log('Database seeded with Hello World message.');
  } else {
    console.log('Database already contains messages, skipping seed.');
  }
}

// --- Routes ---
app.get('/api/hello', async (req, res) => {
  try {
    const doc = await Message.findOne().sort({ createdAt: -1 });
    if (!doc) {
      return res.status(404).json({ error: 'No message found.' });
    }
    res.json({ message: doc.message });
  } catch (err) {
    console.error('Error fetching message:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// --- Start server ---
async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`Connected to MongoDB at ${MONGO_URI}`);

    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`GET http://localhost:${PORT}/api/hello`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
