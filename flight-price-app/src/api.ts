import axios from 'axios';

const apiUrl = 'https://rancholabs-jatin.onrender.com/api';  // Change this to the backend URL

// Function to handle user login
export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/login`, { email, password });
    return response.data.token;
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Login failed! Please check your credentials.');
  }
};

// Function to handle user signup
export const signup = async (email: string, password: string, username: string) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/signup`, { email, password, username });
    return response.data.token;
  } catch (error) {
    console.error('Signup error:', error);
    throw new Error('Signup failed! Please try again.');
  }
};

// Function to search for flights
export const searchFlights = async (source: string, destination: string, date: string) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User is not authenticated. Please log in.');
  }

  try {
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
  } catch (error) {
    console.error('Error searching for flights:', error);
    throw new Error('Error fetching flight data. Please try again.');
  }
};

// Function to get flight prices
export const getFlightPrices = async (airline?: string) => {
    const token = localStorage.getItem('token');
    const url = airline ? `${apiUrl}/prices?airline=${airline}` : `${apiUrl}/prices`;
  
    if (!token) {
      throw new Error('User is not authenticated. Please log in.');
    }
  
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching flight prices:', error);
      throw new Error('Error fetching flight prices. Please try again.');
    }
  };

// Function to get available options (sources, destinations, dates)
export const getAvailableOptions = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User is not authenticated. Please log in.');
  }

  try {
    const response = await axios.get(`${apiUrl}/available-options`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching available options:', error);
    throw new Error('Error fetching available options. Please try again.');
  }
};
