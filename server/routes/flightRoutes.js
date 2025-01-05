const express = require('express');
const flightController = require('../controllers/flightController');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

// Protect the flight search and flight price routes
router.post('/flights', authenticateUser, flightController.searchFlights);
router.get('/prices', authenticateUser, flightController.getFlightPrices);
router.get('/available-options', authenticateUser, flightController.getAvailableOptions);

module.exports = router;
