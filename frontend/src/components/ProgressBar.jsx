import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ current, total }) => {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="h-1.5 w-full bg-gray-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.5)]"
        />
      </div>
      <div className="px-6 py-4 flex justify-between items-center bg-white/50 backdrop-blur-sm border-b border-gray-100">
        <span className="text-sm font-bold text-indigo-600 font-outfit uppercase tracking-wider">
          Profile Setup
        </span>
        <span className="text-sm font-bold text-gray-400 font-outfit">
          {percentage}% Complete
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
