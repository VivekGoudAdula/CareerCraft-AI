import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  LogOut, 
  LayoutDashboard, 
  CheckCircle2, 
  FileText, 
  Globe, 
  TrendingUp, 
  Eye, 
  Zap,
} from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import AppNavbar from '../components/AppNavbar';

import api from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('User');
  const [profileStatus, setProfileStatus] = useState([
    { label: "Profile Completed", status: false },
    { label: "Skills Added", status: false },
    { label: "Experience Detailed", status: false },
    { label: "Projects Showcased", status: false },
  ]);

  useEffect(() => {
    const name = localStorage.getItem('userName');
    if (name) setUserName(name.split(' ')[0]); 
    
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    if (!token) {
      navigate('/login');
      return;
    }

    if (userId) {
      fetchProfileStatus(userId);
    }
  }, [navigate]);

  const fetchProfileStatus = async (userId) => {
    try {
      const response = await api.get(`/profile/${userId}`);
      const data = response.data;
      
      const skills = data.skills;
      const experience = Array.isArray(data.experience) ? data.experience : [];
      const projects = Array.isArray(data.projects) ? data.projects : [];
      
      setProfileStatus([
        { label: "Profile Completed", status: true },
        { label: "Skills Added", status: !!skills && skills.length > 0 },
        { label: "Experience Detailed", status: experience.length > 0 },
        { label: "Projects Showcased", status: projects.length > 0 },
      ]);
    } catch (err) {
      console.error("Failed to fetch profile status", err);
    }
  };

  const stats = [
    { label: "Resumes Generated", value: "12", icon: <FileText className="w-5 h-5" />, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Portfolio Views", value: "248", icon: <Eye className="w-5 h-5" />, color: "text-pink-600", bg: "bg-pink-50" },
    { label: "Profile Strength", value: "85%", icon: <Zap className="w-5 h-5" />, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  const dashboardActions = [
    {
      title: "AI Resume Builder",
      description: "Generate an ATS-optimized resume tailored specifically for your target roles using advanced AI logic.",
      icon: "📄",
      buttonText: "Create Resume",
      onClick: () => navigate("/resume"),
      gradient: "bg-indigo-600"
    },
    {
      title: "Portfolio Generator",
      description: "Convert your profile data into a beautiful, live-hosted portfolio website in seconds.",
      icon: "🌐",
      buttonText: "Live Preview",
      onClick: () => navigate("/portfolio"),
      gradient: "bg-pink-600"
    }
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] font-inter text-gray-900">
      <AppNavbar />

      {/* Hero Section with Gradient Background */}
      <div className="relative overflow-hidden bg-white border-b border-gray-100">
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-indigo-50/50 to-transparent"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-48 -left-24 w-72 h-72 bg-pink-100 rounded-full blur-3xl opacity-30"></div>
        
        <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold mb-6">
              <TrendingUp className="w-3 h-3" /> Dashboard Overview
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-4 font-outfit tracking-tight">
              Welcome back, <span className="gradient-text">{userName}</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
              Let's build your professional profile and launch your career with AI-powered tools.
            </p>
          </motion.div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center gap-5"
              >
                <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shadow-inner`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-2xl font-black text-gray-900">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main Action Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
            {dashboardActions.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="h-full"
              >
                <DashboardCard {...action} />
              </motion.div>
            ))}
          </div>

          {/* Bottom Section: Profile Checklist & Quick Tips */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="lg:col-span-2 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[2.5rem] p-10 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-indigo-200"
            >
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="flex-grow">
                  <h3 className="text-3xl font-bold mb-4 font-outfit">Complete your profile to unlock premium insights.</h3>
                  <p className="text-indigo-100 mb-8 max-w-lg leading-relaxed">
                    Our AI models perform best when they have a complete picture of your journey. Add your latest projects and certifications.
                  </p>
                  <button className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-2xl hover:bg-gray-100 transition-all flex items-center gap-2">
                    Complete Onboarding <CheckCircle2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex-shrink-0 w-32 h-32 md:w-48 md:h-48 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-3xl border border-white/20">
                  <Zap className="w-16 h-16 md:w-24 md:h-24 text-indigo-200 opacity-50" />
                </div>
              </div>
              
              {/* Decorative SVG behind */}
              <svg className="absolute top-0 right-0 opacity-10 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
              </svg>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                Launch Checklist
              </h3>
              <div className="space-y-6">
                {profileStatus.map((item, index) => (
                  <div key={index} className="flex items-center justify-between group cursor-default">
                    <span className={`font-medium transition-colors ${item.status ? 'text-gray-400' : 'text-gray-700'}`}>{item.label}</span>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${item.status ? 'bg-green-100 text-green-600' : 'bg-gray-50 border-2 border-gray-200'}`}>
                      {item.status && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100 mt-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold font-outfit">CareerCraft AI</span>
          </div>
          <div className="flex gap-10 text-sm text-gray-500 font-medium">
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Contact</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">API</a>
          </div>
          <p className="text-sm text-gray-400 lowercase italic">
            &copy; 2024 Crafted with Precision.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
