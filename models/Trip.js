const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imagePath: { type: String, required: true },
  itinerary: [{ type: String, required: true }],
  tripHighlights: [{ type: String }],
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trip', TripSchema); 