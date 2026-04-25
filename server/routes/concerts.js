const express = require('express');
const router = express.Router();
const Concert = require('../db/models/Concert');

/**
 * @openapi
 * /concerts:
 *   get:
 *     summary: List all active concerts
 *     tags: [Concerts]
 *     responses:
 *       200:
 *         description: Array of concert objects
 */
router.get('/', async (_req, res) => {
  try {
    const concerts = await Concert.find({ deletedAt: null });
    res.json(concerts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch concerts' });
  }
});

/**
 * @openapi
 * /concerts/{id}:
 *   get:
 *     summary: Get a single concert by ID
 *     tags: [Concerts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Concert object
 *       404:
 *         description: Not found
 */
router.get('/:id', async (req, res) => {
  try {
    const concert = await Concert.findOne({ _id: req.params.id, deletedAt: null });
    if (!concert) return res.status(404).json({ message: 'Concert not found' });
    res.json(concert);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch concert' });
  }
});

/**
 * @openapi
 * /concerts:
 *   post:
 *     summary: Create a concert
 *     tags: [Concerts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [imageUrl, title, date, venue, price]
 *             properties:
 *               imageUrl:    { type: string }
 *               title:       { type: string }
 *               date:        { type: string }
 *               venue:       { type: string }
 *               price:       { type: string }
 *               doorsOpen:   { type: string }
 *               description: { type: string }
 *     responses:
 *       201:
 *         description: Created concert
 *       400:
 *         description: Validation error
 */
router.post('/', async (req, res) => {
  try {
    const concert = await Concert.create(req.body);
    res.status(201).json(concert);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @openapi
 * /concerts/{id}:
 *   put:
 *     summary: Update a concert
 *     tags: [Concerts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Updated concert
 *       404:
 *         description: Not found
 */
router.put('/:id', async (req, res) => {
  try {
    const concert = await Concert.findOneAndUpdate(
      { _id: req.params.id, deletedAt: null },
      req.body,
      { new: true, runValidators: true }
    );
    if (!concert) return res.status(404).json({ message: 'Concert not found' });
    res.json(concert);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @openapi
 * /concerts/{id}:
 *   delete:
 *     summary: Soft-delete a concert
 *     tags: [Concerts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Concert soft-deleted
 *       404:
 *         description: Not found
 */
router.delete('/:id', async (req, res) => {
  try {
    const concert = await Concert.findOneAndUpdate(
      { _id: req.params.id, deletedAt: null },
      { deletedAt: new Date() },
      { new: true }
    );
    if (!concert) return res.status(404).json({ message: 'Concert not found' });
    res.json({ message: 'Concert deleted', concert });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete concert' });
  }
});

module.exports = router;
