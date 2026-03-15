import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Plus, X, Check } from 'lucide-react';

const QuestionCard = ({ 
  question, 
  value, 
  onChange, 
  onNext, 
  type = "text", 
  placeholder = "Type your answer...",
  options = [],
  isList = false,
  listFields = []
}) => {
  const [inputValue, setInputValue] = useState(value || '');
  const [listData, setListData] = useState(value || []);
  const [currentEntry, setCurrentEntry] = useState({});

  useEffect(() => {
    if (!isList) {
      setInputValue(value || '');
    } else {
      setListData(Array.isArray(value) ? value : []);
    }
  }, [value, isList]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isList && inputValue.trim()) {
      onNext(inputValue);
    }
  };

  const handleAddToList = () => {
    if (Object.keys(currentEntry).length > 0) {
      if (!options?.singleEntry) {
        const newList = [...listData, currentEntry];
        setListData(newList);
        setCurrentEntry({});
        onChange(newList);
      } else {
        onNext(currentEntry);
      }
    }
  };

  const handleRemoveFromList = (index) => {
    const newList = listData.filter((_, i) => i !== index);
    setListData(newList);
    onChange(newList);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6, ease: "circOut" }}
      className="max-w-2xl w-full mx-auto px-6"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 font-outfit leading-tight">
        {question}
      </h2>

      {!isList ? (
        <div className="relative group">
          <input
            autoFocus
            type={type}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              onChange(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full text-2xl md:text-3xl bg-transparent border-b-2 border-gray-200 py-4 focus:border-indigo-600 focus:outline-none transition-all placeholder:text-gray-200"
          />
          <div className="absolute right-0 bottom-4 flex items-center gap-4 text-gray-400">
            <span className="text-xs font-bold uppercase tracking-widest hidden md:block">Press Enter</span>
            <motion.button
              whileHover={{ x: 5 }}
              onClick={() => inputValue.trim() && onNext(inputValue)}
              className="p-2 bg-indigo-600 text-white rounded-full shadow-lg shadow-indigo-600/20"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {listFields.map((field) => (
              <div key={field.name} className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">{field.label}</label>
                <input
                  type="text"
                  placeholder={field.label}
                  value={currentEntry[field.name] || ''}
                  onChange={(e) => setCurrentEntry({ ...currentEntry, [field.name]: e.target.value })}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && options?.singleEntry && Object.keys(currentEntry).length === listFields.length) {
                      onNext(currentEntry);
                    }
                  }}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:border-indigo-600 focus:outline-none focus:bg-white transition-all"
                />
              </div>
            ))}
          </div>

          {!options?.singleEntry ? (
            <>
              <button
                onClick={handleAddToList}
                className="flex items-center gap-2 text-indigo-600 font-bold text-sm bg-indigo-50 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Entry
              </button>

              <div className="space-y-3 mt-8">
                {listData.map((item, index) => (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={index}
                    className="flex justify-between items-center p-4 bg-white border border-gray-100 rounded-xl shadow-sm"
                  >
                    <div className="flex flex-wrap gap-2">
                      {Object.values(item).map((val, i) => (
                        <span key={i} className="text-gray-700 font-medium">
                          {val}{i < Object.values(item).length - 1 ? ' • ' : ''}
                        </span>
                      ))}
                    </div>
                    <button 
                      onClick={() => handleRemoveFromList(index)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))}
              </div>

              {listData.length > 0 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => onNext(listData)}
                  className="mt-8 bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/20"
                >
                  Continue <ChevronRight className="w-5 h-5" />
                </motion.button>
              )}
            </>
          ) : (
            <div className="flex justify-end pt-4">
              <div className="flex items-center gap-4 text-gray-400">
                <span className="text-xs font-bold uppercase tracking-widest hidden md:block">Press Enter</span>
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={handleAddToList}
                  className="p-3 bg-indigo-600 text-white rounded-full shadow-lg shadow-indigo-600/20"
                >
                  <ChevronRight className="w-8 h-8" />
                </motion.button>
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default QuestionCard;
