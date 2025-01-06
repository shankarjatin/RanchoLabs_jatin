import React, { useState } from 'react';
import { login } from '../../api';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  setToken: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await login(email, password);
      localStorage.setItem('token', token);
      setToken(token);
      navigate('/dashboard');
    } catch (err) {
      setError('Login failed! Please check your credentials.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#441752] to-[#8174A0]">
      <div className="p-6 bg-white rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-[#441752] mb-4">Welcome Back</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address"
            className="w-full p-2 mb-4 border border-[#A888B5] rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 border border-[#A888B5] rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-[#8174A0] text-white py-2 rounded-lg hover:bg-[#441752] transition-colors duration-300">
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-[#441752]">
          Don't have an account? <a href="/" className="text-[#EFB6C8] hover:text-[#441752]">Sign up</a>
        </p>
        {error && <p className="text-[#EFB6C8] text-center mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
