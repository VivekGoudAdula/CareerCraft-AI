import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Resume from './pages/Resume';

import Portfolio from './pages/Portfolio';
import PortfolioView from './pages/PortfolioView';

function App() {
  return (
    <Router>
      <div className="bg-white min-h-screen text-gray-900 font-inter">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/p/:userId" element={<PortfolioView />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
