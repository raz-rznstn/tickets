const mongoose = require('mongoose');
const { randomUUID } = require('crypto');

const ticketSchema = new mongoose.Schema(
  { ticketId: { type: String, required: true } },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderId:         { type: String, unique: true, default: () => randomUUID() },
    concertId:       { type: mongoose.Schema.Types.ObjectId, ref: 'Concert', required: true },
    title:           { type: String, required: true },
    customerEmail:   { type: String },
    stripeSessionId: { type: String, unique: true, required: true },
    stripeLast4:     { type: String, required: true },
    tickets:         { type: [ticketSchema], default: [] },
    deletedAt:       { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
