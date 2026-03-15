import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Loader2 } from 'lucide-react';
import api from '../services/api';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await api.post('/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.user.id);
      localStorage.setItem('userName', response.data.user.name || '');
      localStorage.setItem('userEmail', response.data.user.email || '');

      
      if (response.data.user.has_profile) {
        navigate('/dashboard');
      } else {
        navigate('/onboarding');
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 -right-20 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 -left-20 w-72 h-72 bg-pink-100 rounded-full blur-3xl opacity-50"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white max-w-md w-full p-10 rounded-3xl shadow-2xl shadow-indigo-100/50 z-10 border border-gray-100"
      >
        <div className="text-center mb-10">
          <Link to="/" className="text-3xl font-bold gradient-text mb-4 inline-block">CareerCraft AI</Link>
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Log in to keep crafting your career.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:bg-white transition-all"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <a href="#" className="text-xs text-indigo-600 hover:text-indigo-500 font-semibold">Forgot?</a>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                name="password"
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:bg-white transition-all"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 mt-4"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Login <LogIn className="w-5 h-5" /></>}
          </motion.button>
        </form>

        <p className="text-center text-gray-600 mt-8">
          Don't have an account?{' '}
          <Link to="/signup" className="text-indigo-600 font-bold hover:text-indigo-500 transition-colors">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
