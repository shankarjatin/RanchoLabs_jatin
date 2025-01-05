import React, { useState, useEffect } from 'react';
import { searchFlights } from '../../../src/api';  // Assuming searchFlights is updated to handle searching by filters
const apiUrl = 'http://localhost:5000/';
const FlightSearchForm: React.FC = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [flights, setFlights] = useState<any[]>([]);

  // For storing available options fetched from the backend
  const [availableSources, setAvailableSources] = useState<string[]>([]);
  const [availableDestinations, setAvailableDestinations] = useState<string[]>([]);
  const [availableDates, setAvailableDates] = useState<string[]>([]);

  // Fetch available options from the backend
  const fetchAvailableOptions = async () => {
    try {
      const response = await fetch(`${apiUrl}api/available-options`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setAvailableSources(data.sources);
      setAvailableDestinations(data.destinations);
      setAvailableDates(data.dates);
    } catch (error) {
      console.error('Error fetching available options:', error);
    }
  };

  useEffect(() => {
    fetchAvailableOptions(); // Fetch options when the component mounts
  }, []);

  // Handle flight search form submission
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const searchResults = await searchFlights(source, destination, date);
      setFlights(searchResults);
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl text-center font-semibold text-purple-800 mb-4">Search Flights</h2>
      <form onSubmit={handleSearch}>
        {/* Source Dropdown */}
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
        >
          <option value="">Select Source</option>
          {availableSources.map((src) => (
            <option key={src} value={src}>
              {src}
            </option>
          ))}
        </select>

        {/* Destination Dropdown */}
        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
        >
          <option value="">Select Destination</option>
          {availableDestinations.map((dest) => (
            <option key={dest} value={dest}>
              {dest}
            </option>
          ))}
        </select>

        {/* Date Dropdown */}
        <select
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
        >
          <option value="">Select Date</option>
          {availableDates.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-purple-700 text-white py-2 rounded-lg">
          Search
        </button>
      </form>

      {/* Display Flight Results */}
      {flights.length > 0 && (
        <div className="mt-4">
          {flights.map((flight, index) => (
            <div key={index} className="mb-4 p-4 bg-purple-50 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-purple-800">{flight.airline}</h3>
              <p>Price: ₹{flight.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlightSearchForm;