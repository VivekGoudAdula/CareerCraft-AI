import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100 bg-white/70 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold gradient-text">
          CareerCraft AI
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link to="/login" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
            Login
          </Link>
          <Link to="/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full font-medium transition-all shadow-lg shadow-indigo-600/20"
            >
              Sign Up
            </motion.button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
