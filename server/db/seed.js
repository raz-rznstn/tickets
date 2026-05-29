const { connect } = require('./connection');
const Concert = require('./models/Concert');
const User = require('./models/User');
const { concerts } = require('../mock/concerts');

async function seed() {
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

  const user1Exists = await User.findOne({ email: 'alice@ticketflow.com' });
  if (!user1Exists) {
    await User.create({
      name: 'Alice',
      email: 'alice@ticketflow.com',
      password: 'Alice1234!',
      role: 'user',
    });
    console.log('[seed] User alice created.');
  } else {
    console.log('[seed] User alice already exists — skipping.');
  }

  const user2Exists = await User.findOne({ email: 'bob@ticketflow.com' });
  if (!user2Exists) {
    await User.create({
      name: 'Bob',
      email: 'bob@ticketflow.com',
      password: 'Bob1234!',
      role: 'user',
    });
    console.log('[seed] User bob created.');
  } else {
    console.log('[seed] User bob already exists — skipping.');
  }

  const validatorExists = await User.findOne({ email: 'validator@ticketflow.com' });
  if (!validatorExists) {
    await User.create({
      name: 'Validator',
      email: 'validator@ticketflow.com',
      password: 'Validator1234!',
      role: 'validator',
    });
    console.log('[seed] Validator user created.');
  } else {
    console.log('[seed] Validator user already exists — skipping.');
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