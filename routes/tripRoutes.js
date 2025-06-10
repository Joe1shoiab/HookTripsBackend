const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');

// Create a new trip
router.post('/', tripController.createTrip);

// Get all trips (with optional destinationId filter)
router.get('/', tripController.getAllTrips);

module.exports = router; 