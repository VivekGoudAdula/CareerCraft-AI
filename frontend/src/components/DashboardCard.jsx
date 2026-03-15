import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const DashboardCard = ({ title, description, icon, buttonText, onClick, gradient }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative overflow-hidden bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 flex flex-col items-start text-left cursor-pointer group h-full`}
      onClick={onClick}
    >
      {/* Background Gradient Decorative Blur */}
      <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity ${gradient || 'bg-indigo-600'}`}></div>
      
      <div className="text-5xl mb-8 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 ease-out bg-gray-50 w-16 h-16 flex items-center justify-center rounded-2xl">
        {icon}
      </div>
      
      <div className="flex-grow">
        <h3 className="text-2xl font-bold mb-3 text-gray-900 font-outfit group-hover:text-indigo-600 transition-colors">{title}</h3>
        <p className="text-gray-600 mb-8 leading-relaxed text-sm lg:text-base">{description}</p>
      </div>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className="mt-auto flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 group-hover:gap-4"
      >
        {buttonText} <ArrowRight className="w-5 h-5" />
      </button>
    </motion.div>
  );
};

export default DashboardCard;
