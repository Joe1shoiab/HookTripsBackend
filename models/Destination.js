const mongoose = require('mongoose');

const DestinationSchema = new mongoose.Schema({
  id: { type: Number, default: 1 },
  name: { type: String, required: true },
  images: [{ type: String, required: true }],
  location: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  duration: { type: String, required: true },
  category: { type: String, required: true },
  activities: [{ type: String }],
  highlights: [{ type: String }],
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Add pre-save middleware to auto-increment the id
DestinationSchema.pre('save', async function(next) {
  if (this.isNew) {
    const lastDestination = await this.constructor.findOne().sort({ id: -1 });
    this.id = lastDestination ? lastDestination.id + 1 : 1;
  }
  next();
});

module.exports = mongoose.model('Destination', DestinationSchema); 