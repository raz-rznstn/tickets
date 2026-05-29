const express = require('express');
const router = express.Router();
const Order = require('../db/models/Order');
const { requireAuth, restrictTo } = require('../middleware/auth');

router.get('/', requireAuth, restrictTo('user'), async (req, res) => {
  try {
    const filter = { deletedAt: null, userId: req.user.id };

    const raw = await Order.find(filter, 'orderId title createdAt tickets concertId')
      .populate('concertId', 'date venue');

    const orders = raw.map((o) => ({
      orderId: o.orderId,
      title: o.title,
      createdAt: o.createdAt,
      tickets: o.tickets,
      date: o.concertId?.date ?? null,
      venue: o.concertId?.venue ?? null,
    }));

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// GET /api/orders/:orderId — user can only access their own order
router.get('/:orderId', requireAuth, restrictTo('user'), async (req, res) => {
  try {
    const filter = { orderId: req.params.orderId, deletedAt: null, userId: req.user.id };

    const raw = await Order.findOne(filter, 'orderId title tickets stripeSessionId concertId')
      .populate('concertId', 'date venue');

    if (!raw) return res.status(404).json({ message: 'Order not found' });

    res.json({
      orderId: raw.orderId,
      title: raw.title,
      tickets: raw.tickets,
      stripeSessionId: raw.stripeSessionId,
      date: raw.concertId?.date ?? null,
      venue: raw.concertId?.venue ?? null,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

module.exports = router;