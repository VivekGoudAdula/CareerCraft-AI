import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold gradient-text mb-2">CareerCraft AI</h2>
            <p className="text-gray-600">AI-powered career tools</p>
          </div>
          
          <div className="flex space-x-8">
            <Link to="/login" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">Login</Link>
            <Link to="/signup" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">Signup</Link>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} CareerCraft AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
