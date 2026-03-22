const Message = require('./models/Message');
const Concert = require('./models/Concert');
const { concerts } = require('../mock/concerts');

async function seed() {
  const msgCount = await Message.countDocuments();
  if (msgCount === 0) {
    await Message.create({ message: 'Hello World from MongoDB!' });
    console.log('Seeded hello message.');
  }

  const concertCount = await Concert.countDocuments();
  if (concertCount === 0) {
    await Concert.insertMany(concerts);
    console.log('Seeded default concerts.');
  }
}

module.exports = { seed };
