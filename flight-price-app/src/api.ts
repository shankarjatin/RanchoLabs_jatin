import axios from 'axios';

const apiUrl = 'http://localhost:5000/api';  // Change this to the backend URL

// Function to handle user login
export const login = async (email: string, password: string) => {
  const response = await axios.post(`${apiUrl}/auth/login`, { email, password });
  return response.data.token;
};

// Function to handle user signup
export const signup = async (email: string, password: string, username: string) => {
  const response = await axios.post(`${apiUrl}/auth/signup`, { email, password, username });
  return response.data.token;
};

// Function to search for flights
export const searchFlights = async (source: string, destination: string, date: string) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(
    `${apiUrl}/flights`,
    { source, destination, date },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Function to get flight prices
export const getFlightPrices = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${apiUrl}/prices`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
