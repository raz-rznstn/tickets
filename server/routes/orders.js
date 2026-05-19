const express = require('express');
const router = express.Router();
const Order = require('../db/models/Order');
const { requireAuth, restrictTo } = require('../middleware/auth');

router.get('/', requireAuth, restrictTo('user'), async (req, res) => {
  try {
    const filter = { deletedAt: null, userId: req.user.id };

    const orders = await Order.find(filter, 'orderId title createdAt tickets');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// GET /api/orders/:orderId — user can only access their own order
router.get('/:orderId', requireAuth, restrictTo('user'), async (req, res) => {
  try {
    const filter = { orderId: req.params.orderId, deletedAt: null, userId: req.user.id };

    const order = await Order.findOne(filter, 'orderId title tickets stripeSessionId');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

module.exports = router;