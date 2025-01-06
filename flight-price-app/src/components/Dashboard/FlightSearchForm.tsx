import React, { useState, useEffect } from 'react';
import { searchFlights, getAvailableOptions } from '../../../src/api';
import { useNavigate } from 'react-router-dom';

const FlightSearchForm: React.FC = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [flights, setFlights] = useState<any[]>([]);
  const [error, setError] = useState('');
  
  const [availableSources, setAvailableSources] = useState<string[]>([]);
  const [availableDestinations, setAvailableDestinations] = useState<string[]>([]);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  
  const navigate = useNavigate();
  
  const user = { // Example user info, you would typically get this from a user session or auth context
    username: 'John Doe',
    avatar: 'https://www.w3schools.com/w3images/avatar2.png',
  };

  // Fetch available options from the backend
  const fetchAvailableOptions = async () => {
    try {
      const data = await getAvailableOptions();
      setAvailableSources(data.sources);
      setAvailableDestinations(data.destinations);
      setAvailableDates(data.dates);
    } catch (error) {
      console.error('Error fetching available options:', error);
      setError('Failed to load available options.');
    }
  };

  useEffect(() => {
    fetchAvailableOptions(); // Fetch options on mount
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
        const data = await response.json();
        setAvailableDates(data.dates);
      } catch (error) {
        console.error('Error fetching available dates:', error);
        setError('Failed to load available dates.');
      }
    } else {
      fetchAvailableOptions();
    }
  };

  useEffect(() => {
    handleSourceDestinationChange(); // Update available dates when source or destination changes
  }, [source, destination]);

  // Handle flight search form submission
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFlights([]);

    try {
      const response = await searchFlights(source, destination, date);
      setFlights(response.data);
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.message || 'No flights available for the selected criteria.');
      } else if (error.message) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      {/* User Info Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <img src={user.avatar} alt="User Avatar" className="w-12 h-12 rounded-full mr-3" />
          <div className="text-purple-800 font-semibold">{user.username}</div>
        </div>
        <button
          onClick={handleLogout}
          className="bg-[#8174A0] text-white px-4 py-2 rounded-lg hover:bg-[#441752] transition-colors duration-300"
        >
          Logout
        </button>
      </div>

      <h2 className="text-xl text-center font-semibold text-purple-800 mb-4">Search Flights</h2>
      <form onSubmit={handleSearch}>
        {/* Source Dropdown */}
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="w-full p-2 mb-4 border border-[#A888B5] rounded-lg"
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
          className="w-full p-2 mb-4 border border-[#A888B5] rounded-lg"
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
          className="w-full p-2 mb-4 border border-[#A888B5] rounded-lg"
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
        <button type="submit" className="w-full bg-[#8174A0] text-white py-2 rounded-lg hover:bg-[#441752] transition-colors duration-300" disabled={!date}>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlightSearchForm;
