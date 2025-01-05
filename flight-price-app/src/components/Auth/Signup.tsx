import React, { useState } from 'react';
import axios from 'axios';

interface SignupProps {
  setToken: (token: string) => void;
}

const Signup: React.FC<SignupProps> = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/signup', { email, password, username });
      const token = response.data.token;
      localStorage.setItem('token', token);
      setToken(token);
    } catch (err) {
      setError('Signup failed! Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-500 to-purple-700">
      <div className="p-6 bg-white rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-purple-800 mb-4">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email address"
            className="w-full p-2 mb-4 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 mb-4 border rounded-lg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit" className="w-full bg-purple-700 text-white py-2 rounded-lg">
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account? <a href="/login" className="text-purple-700">Login</a>
        </p>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default Signup;