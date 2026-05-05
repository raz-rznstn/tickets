const express = require('express');
const router = express.Router();
const Order = require('../db/models/Order');

router.post('/validate', async (req, res) => {
  const { transactionId, lastFourDigits } = req.body;

  if (!transactionId || !lastFourDigits) {
    return res.status(400).json({ valid: false, reason: 'Missing fields' });
  }

  const [stripeSessionId, ticketId] = transactionId.split('::');

  if (!stripeSessionId || !ticketId) {
    return res.status(400).json({ valid: false, reason: 'Invalid transaction ID format' });
  }

  try {
    const order = await Order.findOne({ stripeSessionId, deletedAt: null });

    if (!order) {
      return res.json({ valid: false, reason: 'Order not found' });
    }

    if (order.stripeLast4 !== lastFourDigits) {
      return res.json({ valid: false, reason: 'Card digits do not match' });
    }

    const ticket = order.tickets.find(t => t.ticketId === ticketId);

    if (!ticket) {
      return res.json({ valid: false, reason: 'Ticket not found' });
    }

    if (ticket.status === 'redeemed') {
      return res.json({ valid: false, reason: 'Ticket already redeemed' });
    }

    ticket.status = 'redeemed';
    await order.save();

    return res.json({
      valid: true,
      remaining: order.tickets.filter(t => t.status === 'active').length,
    });
  } catch (err) {
    res.status(500).json({ valid: false, reason: 'Server error' });
  }
});

module.exports = router;