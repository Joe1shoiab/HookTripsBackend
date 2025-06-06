const Trip = require('../models/Trip');

// Create a new trip
exports.createTrip = async (req, res) => {
  const { name, imagePath, itinerary, tripHighlights, description } = req.body;
  
  if (!name || !imagePath || !itinerary || !description) {
    return res.status(400).json({ 
      error: "Required fields missing" 
    });
  }

  try {
    const newTrip = new Trip({
      name,
      imagePath,
      itinerary,
      tripHighlights,
      description
    });
    await newTrip.save();
    res.status(200).json({ success: true, msg: "Trip saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save trip" });
  }
};

// Get all trips
exports.getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find().sort({ createdAt: -1 });
    res.status(200).json(trips);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch trips" });
  }
}; 