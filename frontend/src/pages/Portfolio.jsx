import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Layout, Eye, Share2, Check, ExternalLink, ArrowRight, Code, Briefcase, User as UserIcon, Palette } from 'lucide-react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Template1 from '../components/portfolio/Template1';
import Template2 from '../components/portfolio/Template2';
import Template3 from '../components/portfolio/Template3';

const templates = [
  {
    id: 1,
    name: 'Developer Portfolio',
    description: 'Dark theme, sleek code-focused layout with terminal-style elements.',
    icon: <Code className="w-6 h-6" />,
    color: 'bg-indigo-600',
    tag: 'Popular'
  },
  {
    id: 2,
    name: 'Minimal Professional',
    description: 'Clean white design with refined typography and spacious sections.',
    icon: <Briefcase className="w-6 h-6" />,
    color: 'bg-emerald-600',
    tag: 'Clean'
  },
  {
    id: 3,
    name: 'Creative Portfolio',
    description: 'Modern animated layout with bold gradients and playful interactions.',
    icon: <Palette className="w-6 h-6" />,
    color: 'bg-pink-600',
    tag: 'Dynamic'
  }
];

const Portfolio = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [loading, setLoading] = useState(false);
  const [portfolioData, setPortfolioData] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem('userId');
      if (!userId) return;
      
      const res = await api.get(`/portfolio/${userId}`);
      setPortfolioData(res.data);
      setShareLink(`${window.location.origin}/p/${userId}`);
    } catch (err) {
      console.error("Error fetching portfolio data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setShareLink(`${window.location.origin}/p/${userId}?t=${selectedTemplate}`);
    }
  }, [selectedTemplate]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderSelectedTemplate = () => {
    if (!portfolioData) return null;
    
    switch (selectedTemplate) {
      case 1: return <Template1 data={portfolioData} />;
      case 2: return <Template2 data={portfolioData} />;
      case 3: return <Template3 data={portfolioData} />;
      default: return <Template1 data={portfolioData} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] text-[#0f172a] font-inter">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-bold uppercase tracking-widest mb-4">
              <Layout className="w-3 h-3" /> Web Generator
            </div>
            <h1 className="text-4xl md:text-5xl font-black font-outfit tracking-tight text-gray-900 mb-2">
              Portfolio <span className="gradient-text">Studio</span>
            </h1>
            <p className="text-gray-500 font-medium max-w-xl">
              Instantly transform your career data into a high-converting personal website. Pick a template and go live in seconds.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass-card p-8 rounded-[2rem] border-white/50 space-y-6">
              <h3 className="font-bold text-xl font-outfit flex items-center gap-3">
                <Palette className="w-6 h-6 text-indigo-600" />
                Select Template
              </h3>
              
              <div className="space-y-4">
                {templates.map((template) => (
                  <motion.div
                    key={template.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                      selectedTemplate === template.id 
                        ? 'border-indigo-600 bg-indigo-50/50 shadow-lg shadow-indigo-100' 
                        : 'border-gray-100 hover:border-gray-200 bg-white shadow-sm'
                    }`}
                  >
                    {selectedTemplate === template.id && (
                      <div className="absolute top-4 right-4 text-indigo-600">
                        <Check className="w-5 h-5" />
                      </div>
                    )}
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 ${template.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                        {template.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-gray-900">{template.name}</h4>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-gray-100 text-gray-500 font-bold uppercase">
                            {template.tag}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 font-medium leading-relaxed">
                          {template.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-100">
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white px-6 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-gray-100"
                >
                  <Share2 className="w-5 h-5" />
                  {copied ? 'Link Copied!' : 'Copy Share Link'}
                </button>
                <p className="mt-3 text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest">
                  Live URL: {shareLink.replace('http://', '').replace('https://', '')}
                </p>
              </div>
            </div>

            <div className="glass-card p-8 rounded-[2rem] border-white/50 bg-indigo-600">
              <h3 className="text-white font-bold text-xl font-outfit mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-300" />
                Auto-Sync Active
              </h3>
              <p className="text-indigo-100 text-xs font-medium leading-relaxed">
                Changes to your onboarding profile will automatically reflect here. No manual updates needed.
              </p>
              <button 
                onClick={() => window.open(shareLink, '_blank')}
                className="mt-6 w-full flex items-center justify-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold text-sm shadow-xl shadow-indigo-900/20"
              >
                Launch Live Site <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Eye className="w-5 h-5 text-gray-400" />
                Real-time Preview
              </h3>
              <div className="flex gap-2">
                {['Desktop', 'Tablet', 'Mobile'].map((device) => (
                  <button key={device} className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-indigo-600 px-2 py-1">
                    {device}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100 border border-gray-100 overflow-hidden relative group">
              {/* Browser Header Mockup */}
              <div className="h-10 bg-gray-50 border-b border-gray-100 flex items-center px-6 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-300"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-300"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-300"></div>
                </div>
                <div className="mx-auto bg-white rounded-md border border-gray-200 px-10 py-0.5 text-[9px] text-gray-400 font-medium">
                  {shareLink}
                </div>
              </div>

              {/* Scrollable Content */}
              <div className={`h-[700px] overflow-y-auto overflow-x-hidden ${selectedTemplate === 2 ? 'mockup-scrollbar' : 'mockup-scrollbar-dark'}`}>
                {loading ? (
                  <div className="h-full flex flex-col items-center justify-center">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full mb-4"
                    />
                    <p className="text-gray-400 font-medium animate-pulse">Assembling components...</p>
                  </div>
                ) : (
                  renderSelectedTemplate()
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
