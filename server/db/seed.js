const { connect } = require('./connection');
const Message = require('./models/Message');
const Concert = require('./models/Concert');
const User = require('./models/User');
const { concerts } = require('../mock/concerts');

async function seed() {
  const msgCount = await Message.countDocuments();
  if (msgCount === 0) {
    await Message.create({ message: 'Hello World from MongoDB!' });
    console.log('[seed] Seeded hello message.');
  } else {
    console.log('[seed] Message collection already has data — skipping.');
  }

  const concertCount = await Concert.countDocuments();
  if (concertCount === 0) {
    await Concert.insertMany(concerts);
    console.log(`[seed] Seeded ${concerts.length} concerts.`);
  } else {
    console.log(`[seed] Concerts collection already has ${concertCount} document(s) — skipping.`);
  }

  const adminExists = await User.findOne({ email: 'admin@ticketflow.com' });
  if (!adminExists) {
    await User.create({
      name: 'Admin',
      email: 'admin@ticketflow.com',
      password: 'Admin1234!',
      role: 'admin',
    });
    console.log('[seed] Admin user created.');
  } else {
    console.log('[seed] Admin user already exists — skipping.');
  }

  const scannerExists = await User.findOne({ email: 'scanner@ticketflow.com' });
  if (!scannerExists) {
    await User.create({
      name: 'Scanner',
      email: 'scanner@ticketflow.com',
      password: 'Scanner1234!',
      role: 'scanner',
    });
    console.log('[seed] Scanner user created.');
  } else {
    console.log('[seed] Scanner user already exists — skipping.');
  }
}

if (process.argv.includes('--seed') && require.main === module) {
  connect()
    .then(seed)
    .then(() => {
      console.log('[seed] Done.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('[seed] Error:', err);
      process.exit(1);
    });
}

module.exports = { seed };