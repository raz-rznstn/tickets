const express = require('express');
const router = express.Router();
const Order = require('../db/models/Order');

/**
 * @openapi
 * /orders:
 *   get:
 *     summary: List all active orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Array of { orderId, title }
 */
router.get('/', async (_req, res) => {
  try {
    const orders = await Order.find({ deletedAt: null }, 'orderId title');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

/**
 * @openapi
 * /orders/{orderId}:
 *   get:
 *     summary: Get a single order by orderId
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order with tickets
 *       404:
 *         description: Not found
 */
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne(
      { orderId: req.params.orderId, deletedAt: null },
      'orderId title tickets'
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

module.exports = router;
