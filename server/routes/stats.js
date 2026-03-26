const express = require('express');
const router = express.Router();
const { stats } = require('../mock/stats');

router.get('/', (_req, res) => {
  res.json(stats);
});

module.exports = router;
