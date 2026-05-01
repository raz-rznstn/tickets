const mongoose = require('mongoose');

const highlightSchema = new mongoose.Schema(
  {
    icon:  { type: String },
    label: { type: String },
    value: { type: String },
  },
  { _id: false }
);

const concertSchema = new mongoose.Schema(
  {
    imageUrl:    { type: String, required: true },
    title:       { type: String, required: true },
    date:        { type: String, required: true },
    venue:       { type: String, required: true },
    price:       { type: String, required: true },
    doorsOpen:   { type: String },
    description: { type: String },
    highlights:   { type: [highlightSchema], default: [] },
    genre:        { type: String },
    ageLimit:     { type: String },
    photography:  { type: String },
    capacity:     { type: Number },
    soldTickets:  { type: Number, default: 0 },
    deletedAt:    { type: Date, default: null },
  },
  { toJSON: { virtuals: true } }
);

concertSchema.virtual('availableSeats').get(function () {
  if (this.capacity == null) return null;
  return this.capacity - (this.soldTickets || 0);
});

module.exports = mongoose.model('Concert', concertSchema);
