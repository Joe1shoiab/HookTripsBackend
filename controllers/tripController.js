const Trip = require('../models/Trip');

// Create a new trip
exports.createTrip = async (req, res) => {
  const { 
    title,
    name, 
    images, 
    description, 
    destinationId,
    price,
    duration,
    highlights,
    itinerary 
  } = req.body;
  
  if (!title || !name || !images || !description || !destinationId || !price || !duration || !itinerary) {
    return res.status(400).json({ 
      error: "Required fields missing. All fields are required." 
    });
  }

  // Validate that destinationId is a number
  if (typeof destinationId !== 'number') {
    return res.status(400).json({
      error: "destinationId must be a number"
    });
  }

  // Validate that images is an array
  if (!Array.isArray(images)) {
    return res.status(400).json({
      error: "Images must be provided as an array"
    });
  }

  // Validate that images array is not empty
  if (images.length === 0) {
    return res.status(400).json({
      error: "At least one image is required"
    });
  }

  // Validate that all items in images array are strings
  if (!images.every(image => typeof image === 'string')) {
    return res.status(400).json({
      error: "All images must be strings"
    });
  }

  try {
    const newTrip = new Trip({
      title,
      name,
      images,
      description,
      destinationId,
      price,
      duration,
      highlights,
      itinerary
    });
    await newTrip.save();
    res.status(200).json({ success: true, msg: "Trip saved successfully", trip: newTrip });
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