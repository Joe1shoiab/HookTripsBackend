const Destination = require('../models/Destination');

// Create a new destination
exports.createDestination = async (req, res) => {
  const { name, imagePath, duration, price, highlights, description } = req.body;
  
  if (!name || !imagePath || !duration || !price || !description) {
    return res.status(400).json({ 
      error: "Required fields missing" 
    });
  }

  try {
    const newDestination = new Destination({
      name,
      imagePath,
      duration,
      price,
      highlights,
      description
    });
    await newDestination.save();
    res.status(200).json({ success: true, msg: "Destination saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save destination" });
  }
};

// Get all destinations
exports.getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find().sort({ createdAt: -1 });
    res.status(200).json(destinations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch destinations" });
  }
}; 