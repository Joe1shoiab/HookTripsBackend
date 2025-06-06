const mongoose = require('mongoose');

const DestinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imagePath: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  highlights: [{ type: String }],
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Destination', DestinationSchema); 