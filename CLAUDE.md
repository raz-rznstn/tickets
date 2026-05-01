# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**Install all dependencies (run once after cloning):**
```bash
npm run install:all
```

**Run the full dev environment (MongoDB + server + client):**
```bash
npm run dev
```
This runs `docker-compose up -d` (MongoDB on port 27017), Express on port 5010, and Vite on port 3000 concurrently.

**Run with seed (populates DB if empty, then starts server + client):**
```bash
cd server && node index.js --seed
```

**Stop MongoDB:**
```bash
npm run stop
```

**Run only the backend or frontend:**
```bash
npm run server   # Express only
npm run client   # Vite only
```

**Build the frontend:**
```bash
npm run build --prefix client
```

There are no tests configured.

## Environment Setup

Copy `server/.env.example` to `server/.env` and fill in:
- `MONGO_URI` — MongoDB connection string (default: `mongodb://localhost:27017/ticketflow`)
- `PORT` — server port (default: 5010)
- `STRIPE_SECRET_KEY` — Stripe secret key (free test key available at stripe.com → Developers → API keys)
- `YOUR_DOMAIN` — frontend origin for Stripe return URLs (default: `http://localhost:3000`)

## Local MongoDB Access

MongoDB runs in Docker (`tickets-mongo-1` container) on port 27017, database name `ticketflow`.

**Open a shell into the DB:**
```bash
docker exec -it tickets-mongo-1 mongosh ticketflow
```

**Useful queries:**
```js
db.concerts.find().pretty()          // list all concerts
db.concerts.find({ deletedAt: null }) // list non-deleted concerts
db.orders.find().pretty()            // list all orders
db.concerts.deleteMany({})           // clear concerts (before re-seeding)
db.orders.deleteMany({})             // clear orders
```

**Re-seed concerts after clearing:**
```bash
cd server && node index.js --seed
```

## Architecture

This is a MERN stack app split into `client/` (React + Vite) and `server/` (Express + Mongoose). There is no TypeScript — everything is plain JavaScript.

### Request flow

The Vite dev server proxies all `/api` requests to `http://localhost:5010`, so the frontend always calls `/api/...` with no hardcoded host. In production, a reverse proxy would need to do the same.

### Client structure

- `Root.jsx` — wraps the app with `QueryClientProvider` and `BrowserRouter`, renders `<Navbar>` above all routes
- `AppRoutes.jsx` — all route definitions live here; pages map 1:1 to files in `pages/`
- `services/api/api.js` — all raw `fetch` calls to the backend; every endpoint has a corresponding wrapper here
- `services/api/hooks/` — one file per resource, each exporting a React Query hook (`useGetConcert`, `useGetMyOrders`, etc.) that calls `api.js`. Pages consume only hooks, never `fetch` directly.

### Server structure

- `index.js` — Express entry point; mounts routers, handles Stripe checkout routes directly, connects to MongoDB on startup
- `routes/concerts.js` — full CRUD for concerts backed by MongoDB (`Concert` model); supports soft delete via `deletedAt`
- `routes/orders.js` — GET all orders and GET single order by `orderId`
- `routes/stats.js` — returns static mock stats
- `db/models/Concert.js` — Mongoose schema with `capacity`, `soldTickets`, `availableSeats` virtual, soft delete
- `db/models/Order.js` — Mongoose schema with `orderId` (UUID), `stripeSessionId`, `tickets[]`, soft delete
- `db/seed.js` — seeds concerts and a hello message if collections are empty; run via `--seed` flag

### Data persistence

All data is stored in MongoDB. Concerts and orders use soft delete (`deletedAt` field). Re-seeding is idempotent — it checks if data exists before inserting.

### Stripe integration

Stripe embedded-page checkout is implemented end-to-end:
1. `POST /api/create-checkout-session` — checks availability, creates a Stripe session with `concertId`/`title` in metadata, returns `clientSecret`
2. `BuyTickets` page renders Stripe's embedded UI using `@stripe/react-stripe-js`
3. On completion, Stripe redirects to `/return?session_id=...`
4. `GET /api/session-status` — confirms payment, creates an `Order` document (idempotent), and increments `soldTickets` on the concert

### Styling

No CSS framework. Styles are written as plain JS objects (inline styles) with shared design tokens in `client/src/styles/`. Common patterns (containers, cards, buttons) are defined there and imported into components.
