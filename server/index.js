require('dotenv').config();
const createStripe = require('stripe');
const stripe = process.env.STRIPE_SECRET_KEY
  ? createStripe(process.env.STRIPE_SECRET_KEY)
  : null;
const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { randomUUID } = require('crypto');

const { connect } = require('./db/connection');
const { seed } = require('./db/seed');
const Concert = require('./db/models/Concert');
const Order = require('./db/models/Order');

const concertsRouter = require('./routes/concerts');
const statsRouter = require('./routes/stats');
const ordersRouter = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 5010;

app.use(cors({
  origin: process.env.YOUR_DOMAIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// --- Swagger ---
// Docs are generated from @openapi JSDoc annotations in route files and this file.
// Keep annotations in sync with any route changes — there is no automatic drift detection.
// TODO: migrate to Zod schemas + zod-openapi once the project moves to TypeScript,
// so request/response shapes serve as both runtime validation and the OpenAPI source of truth.
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: { title: 'Tickets API', version: '1.0.0' },
    servers: [{ url: '/api' }],
    tags: [
      { name: 'Concerts', description: 'Concert CRUD' },
      { name: 'Orders', description: 'Orders' },
      { name: 'Stripe', description: 'Checkout & payment status' },
    ],
  },
  apis: ['./routes/*.js', './index.js'],
});
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- Routes ---
app.use('/api/concerts', concertsRouter);
app.use('/api/stats', statsRouter);
app.use('/api/orders', ordersRouter);

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Server is up
 */
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// --- Stripe Routes ---
function stripeUnconfiguredResponse(res) {
  return res.status(503).json({
    error: 'Stripe is not configured. Set STRIPE_SECRET_KEY in server/.env.',
  });
}

/**
 * @openapi
 * /create-checkout-session:
 *   post:
 *     summary: Create a Stripe embedded checkout session
 *     tags: [Stripe]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, price, concertId]
 *             properties:
 *               title:     { type: string }
 *               price:     { type: string }
 *               concertId: { type: string }
 *     responses:
 *       200:
 *         description: clientSecret for Stripe embedded checkout
 */
app.post('/api/create-checkout-session', async (req, res) => {
  if (!stripe) return stripeUnconfiguredResponse(res);
  try {
    const YOUR_DOMAIN = process.env.YOUR_DOMAIN || 'http://localhost:3000';
    const { title, price, concertId } = req.body;

    const concert = await Concert.findById(concertId);
    if (concert?.capacity != null && concert.soldTickets >= concert.capacity) {
      return res.status(409).json({ error: 'This concert is sold out.' });
    }

    const amount = Math.round(parseFloat(price.replace(/[^0-9.]/g, '')) * 100);

    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded_page',
      line_items: [{
        price_data: {
          currency: 'usd',
          unit_amount: amount,
          product_data: { name: title },
        },
        quantity: 1,
      }],
      mode: 'payment',
      return_url: `${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
      metadata: { concertId, title },
    });

    res.json({ clientSecret: session.client_secret });
  } catch (error) {
    console.error('Stripe session error:', error);
    res.status(500).json({ error: 'Unable to create checkout session' });
  }
});

/**
 * @openapi
 * /session-status:
 *   get:
 *     summary: Check Stripe session status; creates Order on first complete check
 *     tags: [Stripe]
 *     parameters:
 *       - in: query
 *         name: session_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Session status and customer email
 */
app.get('/api/session-status', async (req, res) => {
  if (!stripe) return stripeUnconfiguredResponse(res);
  try {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

    if (session.status === 'complete') {
      const existing = await Order.findOne({ stripeSessionId: session.id });
      if (!existing) {
        const { concertId, title } = session.metadata;
        const suffix = randomUUID().split('-')[0].toUpperCase();
        await Promise.all([
          Order.create({
            concertId,
            title,
            customerEmail: session.customer_details?.email || '',
            stripeSessionId: session.id,
            tickets: [{ ticketId: `TF-${concertId}-${suffix}` }],
          }),
          Concert.findByIdAndUpdate(concertId, { $inc: { soldTickets: 1 } }),
        ]);
      }
    }

    res.json({
      status: session.status,
      customer_email: session.customer_details?.email || null,
    });
  } catch (error) {
    console.error('Stripe session status error:', error);
    res.status(500).json({ error: 'Unable to retrieve session status' });
  }
});

// --- Startup ---
connect()
  .then(async () => {
    if (process.argv.includes('--seed')) await seed();
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  });
