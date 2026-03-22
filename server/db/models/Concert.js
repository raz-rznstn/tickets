const mongoose = require('mongoose');

const concertSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  title: { type: String, required: true },
  date:  { type: String, required: true },
  venue: { type: String, required: true },
  price: { type: String, required: true },
});

module.exports = mongoose.model('Concert', concertSchema);
