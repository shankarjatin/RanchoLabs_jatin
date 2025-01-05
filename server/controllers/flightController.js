const authenticateUser = require('../middleware/authMiddleware');

// Dummy flight data
const flights =[
    { "source": "Delhi", "destination": "Jaipur", "date": "2023-04-15", "airline": "indigo", "price": 1614 },
    { "source": "Delhi", "destination": "Jaipur", "date": "2023-05-10", "airline": "indigo", "price": 1614 },
    { "source": "Delhi", "destination": "Jaipur", "date": "2023-06-01", "airline": "indigo", "price": 1614 },
    { "source": "Delhi", "destination": "Jaipur", "date": "2023-04-15", "airline": "airAsia", "price": 1869 },
    { "source": "Delhi", "destination": "Jaipur", "date": "2023-05-10", "airline": "airAsia", "price": 1869 },
    { "source": "Delhi", "destination": "Jaipur", "date": "2023-06-01", "airline": "airAsia", "price": 1869 },
    { "source": "Delhi", "destination": "Jaipur", "date": "2023-04-15", "airline": "vistara", "price": 2133 },
    { "source": "Delhi", "destination": "Jaipur", "date": "2023-05-10", "airline": "vistara", "price": 2133 },
    { "source": "Delhi", "destination": "Jaipur", "date": "2023-06-01", "airline": "vistara", "price": 2133 },
    { "source": "Delhi", "destination": "Mumbai", "date": "2023-04-15", "airline": "indigo", "price": 1800 },
    { "source": "Delhi", "destination": "Mumbai", "date": "2023-05-10", "airline": "indigo", "price": 1800 },
    { "source": "Delhi", "destination": "Mumbai", "date": "2023-06-01", "airline": "indigo", "price": 1800 },
    { "source": "Mumbai", "destination": "Jaipur", "date": "2023-04-15", "airline": "airAsia", "price": 2000 },
    { "source": "Mumbai", "destination": "Jaipur", "date": "2023-05-10", "airline": "airAsia", "price": 2000 },
    { "source": "Mumbai", "destination": "Jaipur", "date": "2023-06-01", "airline": "airAsia", "price": 2000 }
  ]
  
  
// Flight search Controller
// Flight search Controller
exports.searchFlights = async (req, res) => {
    const { source, destination, date } = req.body;
  
    // 1. Input Validation
    if (!source || !destination || !date) {
      return res.status(400).json({ 
        success: false,
        message: 'Source, destination, and date are required.' 
      });
    }
  
    // Additional Validation: Data Types and Date Format
    if (typeof source !== 'string' || typeof destination !== 'string' || typeof date !== 'string') {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid data types for source, destination, or date.' 
      });
    }
  
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
    if (!dateRegex.test(date)) {
      return res.status(400).json({ 
        success: false,
        message: 'Date must be in YYYY-MM-DD format.' 
      });
    }
  
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid date provided.' 
      });
    }
  
    try {
      // 2. Filtering Flights
      const foundFlights = flights.filter(
        (flight) => 
          flight.source.toLowerCase() === source.toLowerCase() &&
          flight.destination.toLowerCase() === destination.toLowerCase() &&
          flight.date === date
      );
  
      // 3. Handling No Flights Found
      if (foundFlights.length === 0) {
        return res.status(404).json({
          success: false,
          message: `No flights available from ${source} to ${destination} on ${date}.`,
        });
      }
  
      // 4. Successful Response
      return res.status(200).json({
        success: true,
        data: foundFlights,
      });
  
    } catch (error) {
      // 5. Logging the Error
      console.error('Error fetching flights:', error);
  
      // 6. Generic Server Error Response
      return res.status(500).json({
        success: false,
        message: 'An unexpected error occurred while fetching flights. Please try again later.',
      });
    }
  };
// Flight prices (mock)
// Flight prices based on available flights
exports.getFlightPrices = (req, res) => {
    const { airline } = req.query;  // Get airline from query params
    
    if (airline) {
      // Filter flights to get the price for the specific airline
      const airlineFlights = flights.filter(flight => flight.airline.toLowerCase() === airline.toLowerCase());
      
      if (airlineFlights.length > 0) {
        const prices = airlineFlights.map(flight => ({
          airline: flight.airline,
          price: flight.price,
        }));
        return res.status(200).json(prices);  // Return all flight prices for the selected airline
      } else {
        return res.status(404).json({ message: `No flights available for the airline: ${airline}.` });
      }
    }
  
    // If no specific airline is requested, return all flight prices
    const flightPrices = flights.map(flight => ({
      airline: flight.airline,
      price: flight.price,
    }));
  
    return res.status(200).json(flightPrices);
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
  