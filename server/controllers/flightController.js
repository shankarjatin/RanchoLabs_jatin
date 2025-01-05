const authenticateUser = require('../middleware/authMiddleware');

// Dummy flight data
const flights = [
    { source: 'Delhi', destination: 'Jaipur', date: '2023-04-15', airline: 'indigo', price: 1614 },
    { source: 'Delhi', destination: 'Jaipur', date: '2023-04-15', airline: 'airAsia', price: 1869 },
    { source: 'Delhi', destination: 'Jaipur', date: '2023-04-15', airline: 'vistara', price: 2133 },
    { source: 'Delhi', destination: 'Mumbai', date: '2023-05-10', airline: 'indigo', price: 1800 },
    { source: 'Mumbai', destination: 'Jaipur', date: '2023-06-01', airline: 'airAsia', price: 2000 },
  ];
  
// Flight search Controller
exports.searchFlights = async (req, res) => {
  const { source, destination, date } = req.body;

  if (!source || !destination || !date) {
    return res.status(400).json({ message: 'Source, destination, and date are required.' });
  }

  const foundFlights = flights.filter(
    (flight) => flight.source === source && flight.destination === destination && flight.date === date
  );

  if (foundFlights.length === 0) {
    return res.status(404).json({ message: 'No flights found.' });
  }

  res.status(200).json(foundFlights);
};

// Flight prices (mock)
exports.getFlightPrices = (req, res) => {
  res.status(200).json({
    "indigo": "₹1,614",
    "airAsia": "₹1,869",
    "vistara": "₹2,133"
  });
};

exports.getAvailableOptions = (req, res) => {
    const { source, destination } = req.query;  // Get source and destination from query params
  
    let filteredFlights = flights;
  
    if (source) {
      filteredFlights = filteredFlights.filter(flight => flight.source === source);
    }
  
    if (destination) {
      filteredFlights = filteredFlights.filter(flight => flight.destination === destination);
    }
  
    const sources = [...new Set(filteredFlights.map((flight) => flight.source))];
    const destinations = [...new Set(filteredFlights.map((flight) => flight.destination))];
    const dates = [...new Set(filteredFlights.map((flight) => flight.date))];
  
    res.status(200).json({
      sources,
      destinations,
      dates,
    });
  };
  