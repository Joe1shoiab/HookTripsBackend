const Trip = require('../models/Trip');

// Create a new trip
exports.createTrip = async (req, res) => {
  const { name, imagePath, itinerary, tripHighlights, description, destinationId } = req.body;
  
  if (!name || !imagePath || !itinerary || !description || destinationId === undefined) {
    return res.status(400).json({ 
      error: "Required fields missing. All fields including destinationId are required." 
    });
  }

  // Validate that destinationId is a number
  if (typeof destinationId !== 'number') {
    return res.status(400).json({
      error: "destinationId must be a number"
    });
  }

  try {
    const newTrip = new Trip({
      name,
      imagePath,
      itinerary,
      tripHighlights,
      description,
      destinationId
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
    const { destinationId } = req.query;
    let query = {};
    
    // If destinationId is provided, filter trips by that destination
    if (destinationId) {
      // Convert destinationId to number since query params are strings
      const destinationIdNum = parseInt(destinationId);
      if (isNaN(destinationIdNum)) {
        return res.status(400).json({ error: "destinationId must be a valid number" });
      }
      query.destinationId = destinationIdNum;
    }

    const trips = await Trip.find(query).sort({ createdAt: -1 });
    res.status(200).json(trips);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch trips" });
  }
}; 