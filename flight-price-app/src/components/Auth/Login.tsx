import React, { useState } from 'react';
import axios from 'axios';

interface LoginProps {
  setToken: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      setToken(token);
    } catch (err) {
      setError('Login failed! Please check your credentials.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-500 to-purple-700">
      <div className="p-6 bg-white rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-purple-800 mb-4">Welcome Back</h2>
        <form onSubmit={handleLogin}>
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
          <div className="mb-4">
            <input type="checkbox" className="mr-2" /> Remember for 30 days
          </div>
          <button type="submit" className="w-full bg-purple-700 text-white py-2 rounded-lg">
            Login
          </button>
        </form>
        <p className="text-center mt-4">
          Don't have an account? <a href="/signup" className="text-purple-700">Sign up</a>
        </p>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
