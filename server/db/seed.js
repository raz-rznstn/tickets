const { connect } = require('./connection');
const Message = require('./models/Message');
const Concert = require('./models/Concert');
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
