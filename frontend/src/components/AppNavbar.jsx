import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  LogOut, 
  LayoutDashboard, 
  ChevronDown,
  Bell,
  Search,
  Settings
} from 'lucide-react';

const AppNavbar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('User');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem('userName');
    if (name) setUserName(name.split(' ')[0]); 
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/dashboard')}>
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20 group-hover:scale-110 transition-transform">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold font-outfit tracking-tight">CareerCraft <span className="text-indigo-600">AI</span></span>
          </div>
          
          {/* Search Bar - SaaS Style */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-72 border border-transparent focus-within:border-indigo-300 focus-within:bg-white transition-all">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input type="text" placeholder="Search tools..." className="bg-transparent border-none outline-none text-sm w-full" />
            <span className="text-[10px] font-bold text-gray-400 bg-white px-1.5 py-0.5 rounded border">⌘K</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="p-2.5 text-gray-500 hover:bg-gray-50 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="h-8 w-[1px] bg-gray-100 mx-2"></div>
            
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1 pl-3 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-full transition-all"
              >
                <span className="text-sm font-bold text-gray-700 hidden sm:inline">{userName}</span>
                <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold ring-2 ring-white">
                  {userName.charAt(0)}
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-gray-50 mb-2">
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Account</p>
                      <p className="text-sm font-bold text-gray-900 truncate">{userName}</p>
                    </div>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                      <User className="w-4 h-4" /> Profile Settings
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                      <Settings className="w-4 h-4" /> Preferences
                    </button>
                    <div className="h-[1px] bg-gray-50 my-1"></div>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
