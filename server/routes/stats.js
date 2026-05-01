const express = require('express');
const router = express.Router();
const { stats } = require('../mock/stats');

router.get('/', (_req, res) => {
  try {
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

module.exports = router;
