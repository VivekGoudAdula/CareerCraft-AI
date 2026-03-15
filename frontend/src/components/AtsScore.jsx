import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Zap } from 'lucide-react';

const AtsScore = ({ score, suggestions }) => {
  const getColor = (s) => {
    if (s >= 80) return 'text-green-500';
    if (s >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getBg = (s) => {
    if (s >= 80) return 'bg-green-500';
    if (s >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-8 rounded-[2rem] border-white/50 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <Zap className="w-24 h-24" />
      </div>

      <div className="flex flex-col items-center text-center mb-8">
        <div className="relative w-32 h-32 flex items-center justify-center mb-4">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="58"
              stroke="currentColor"
              strokeWidth="10"
              fill="transparent"
              className="text-gray-100"
            />
            <motion.circle
              cx="64"
              cy="64"
              r="58"
              stroke="currentColor"
              strokeWidth="10"
              fill="transparent"
              strokeDasharray="364.4"
              initial={{ strokeDashoffset: 364.4 }}
              animate={{ strokeDashoffset: 364.4 - (364.4 * score) / 100 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className={getColor(score)}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-4xl font-black font-outfit ${getColor(score)}`}>{score}</span>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-[-4px]">Percent</span>
          </div>
        </div>
        <h3 className="text-xl font-black text-gray-900 font-outfit tracking-tight">ATS Optimization</h3>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">System Audit Result</p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">AI Audit Logs</h4>
            <span className="text-[10px] font-bold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">{suggestions?.length || 0} Points</span>
        </div>
        <div className="space-y-3">
          {suggestions && suggestions.length > 0 ? (
            suggestions.map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                className="flex items-start gap-4 p-4 bg-white/40 rounded-2xl border border-white group hover:bg-white/60 transition-all"
              >
                <div className={`mt-1 flex-shrink-0 ${score >= 80 ? 'text-green-500' : 'text-amber-500'}`}>
                  {s.toLowerCase().includes('great') || s.toLowerCase().includes('excellent') ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <AlertCircle className="w-4 h-4" />
                  )}
                </div>
                <p className="text-xs text-gray-600 font-medium leading-relaxed">{s}</p>
              </motion.div>
            ))
          ) : (
            <div className="p-4 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200 text-center">
                <p className="text-xs text-gray-400 italic">No audit insights generated yet.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AtsScore;
