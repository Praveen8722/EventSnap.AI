const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  place: { type: String, required: true },
  customer: { type: String, required: true },
  images: [String]
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
