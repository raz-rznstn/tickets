const express = require('express');
const router = express.Router();
const { concerts } = require('../mock/concerts');

router.get('/', (_req, res) => {
  res.json(concerts);
});

router.get('/:id', (req, res) => {
  const concert = concerts.find((c) => c.id === req.params.id);
  if (!concert) return res.status(404).json({ message: 'Concert not found' });
  res.json(concert);
});

router.post('/', (req, res) => {
  const concert = { ...req.body, id: Date.now() };
  concerts.push(concert);
  res.status(201).json(concert);
});

module.exports = router;
