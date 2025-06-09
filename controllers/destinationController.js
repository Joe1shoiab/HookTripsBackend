const Destination = require('../models/Destination');

// Create a new destination
exports.createDestination = async (req, res) => {
  const { 
    name, 
    images, 
    location, 
    price, 
    rating, 
    duration, 
    category, 
    activities, 
    highlights, 
    description 
  } = req.body;
  
  if (!name || !images || !location || !price || !rating || !duration || !category) {
    return res.status(400).json({ 
      error: "Required fields missing" 
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
    const newDestination = new Destination({
      name,
      images,
      location,
      price,
      rating,
      duration,
      category,
      activities,
      highlights,
      description
    });
    await newDestination.save();
    res.status(200).json({ 
      success: true, 
      msg: "Destination saved successfully",
      destination: newDestination 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save destination" });
  }
};

// Get all destinations
exports.getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.status(200).json(destinations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch destinations" });
  }
}; 