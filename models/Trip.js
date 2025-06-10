const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  id: { type: Number, required: false },
  title: { type: String, required: true },
  name: { type: String, required: true },
  images: [{ type: String, required: true }],
  description: { type: String, required: true },
  destinationId: { type: Number, required: true, ref: 'Destination.id' },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  highlights: [{ type: String }],
  itinerary: [{
    day: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true }
  }],
  createdAt: { type: Date, default: Date.now }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add pre-save middleware to auto-increment the id
TripSchema.pre('save', async function(next) {
  if (this.isNew) {
    const lastTrip = await this.constructor.findOne().sort({ id: -1 });
    this.id = lastTrip ? lastTrip.id + 1 : 1;
  }
  next();
});

// Remove _id from the response
TripSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('Trip', TripSchema); 