import React, { useState } from 'react';
import { searchFlights } from '../../api';

const FlightSearchForm: React.FC = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [flights, setFlights] = useState<any[]>([]);

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
        <input
          type="text"
          placeholder="Source"
          className="w-full p-2 mb-4 border rounded-lg"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <input
          type="text"
          placeholder="Destination"
          className="w-full p-2 mb-4 border rounded-lg"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <input
          type="date"
          className="w-full p-2 mb-4 border rounded-lg"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit" className="w-full bg-purple-700 text-white py-2 rounded-lg">
          Search
        </button>
      </form>

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
