const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destinationController');

router.post('/', destinationController.createDestination);
router.get('/', destinationController.getAllDestinations);
router.get('/simplified', destinationController.getSimplifiedDestinations);

module.exports = router; 