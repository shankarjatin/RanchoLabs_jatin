import React, { useState, useEffect } from 'react';
import { searchFlights, getAvailableOptions } from '../../../src/api';

const FlightSearchForm: React.FC = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [flights, setFlights] = useState<any[]>([]);
  const [error, setError] = useState('');

  // For storing available options fetched from the backend
  const [availableSources, setAvailableSources] = useState<string[]>([]);
  const [availableDestinations, setAvailableDestinations] = useState<string[]>([]);
  const [availableDates, setAvailableDates] = useState<string[]>([]);

  // Fetch available options (source, destination, and date) from the backend
  const fetchAvailableOptions = async () => {
    try {
      const data = await getAvailableOptions();  // Call the getAvailableOptions API function
      setAvailableSources(data.sources);
      setAvailableDestinations(data.destinations);
      setAvailableDates(data.dates); // Initially, all dates are shown
    } catch (error) {
      console.error('Error fetching available options:', error);
      setError('Failed to load available options.');
    }
  };

  useEffect(() => {
    fetchAvailableOptions(); // Fetch options when the component mounts
  }, []);

  // Update available dates based on selected source and destination
  const handleSourceDestinationChange = async () => {
    if (source && destination) {
      try {
        const response = await fetch(`/api/available-options?source=${source}&destination=${destination}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch available dates.');
        }
        const data = await response.json();
        setAvailableDates(data.dates); // Filter available dates based on selected source and destination
      } catch (error) {
        console.error('Error fetching available dates:', error);
        setError('Failed to load available dates.');
      }
    } else {
      // If either source or destination is not selected, reset available dates
      fetchAvailableOptions();
    }
  };

  useEffect(() => {
    handleSourceDestinationChange(); // Update available dates when source or destination changes
  }, [source, destination]);

  // Handle flight search form submission
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Reset error before new search
    setFlights([]); // Clear previous flight results

    try {
      const response = await searchFlights(source, destination, date);
      // Assuming searchFlights throws an error for non-200 responses
      setFlights(response.data);
    } catch (error: any) {
      if (error.response) {
        // Server responded with a status other than 2xx
        setError(error.response.data.message || 'No flights available for the selected criteria.');
      } else if (error.message) {
        // Other errors (network issues, etc.)
        setError(error.message);
      } else {
        setError('An unexpected error occurred.');
      }
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
          disabled={!source || !destination} // Disable if source or destination is not selected
        >
          <option value="">Select Date</option>
          {availableDates.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-purple-700 text-white py-2 rounded-lg" disabled={!date}>
          Search
        </button>
      </form>

      {/* Display Errors */}
      {error && (
        <div className="text-center text-red-500 mt-4">
          <p>{error}</p>
        </div>
      )}

      {/* Display Flights if Available */}
      {flights.length > 0 && (
        <div className="mt-4">
          {flights.map((flight, index) => (
            <div key={index} className="mb-4 p-4 bg-purple-50 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-purple-800">{flight.airline}</h3>
              <p>Price: ₹{flight.price}</p>
              {/* Additional Flight Details can be added here */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlightSearchForm;
