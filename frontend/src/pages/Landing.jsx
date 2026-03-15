import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, Shield, Globe, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-indigo-200 transition-all shadow-xl shadow-gray-200/50"
  >
    <div className="bg-indigo-50 p-3 rounded-lg w-fit mb-6">
      <Icon className="text-indigo-600 w-8 h-8" />
    </div>
    <h3 className="text-xl font-bold mb-4 text-gray-900">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </motion.div>
);

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 hero-gradient">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-gray-900">
              Build Your Resume & <br />
              <span className="gradient-text">Portfolio with AI</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Generate ATS-optimized resumes and professional portfolios in seconds. 
              Let AI handle the presentation while you focus on your career.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl shadow-indigo-600/30 flex items-center gap-2"
                >
                  Get Started <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-50 hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-full font-bold text-lg border border-gray-200"
                >
                  Login
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-gray-50/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Powerful Features</h2>
            <p className="text-gray-600">Everything you need to land your dream job</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={FileText}
              title="AI Resume Generator"
              description="Automatically generate structured professional resumes using AI tailored to your target role."
            />
            <FeatureCard 
              icon={Shield}
              title="ATS Optimization"
              description="Analyze resumes and get an ATS compatibility score to ensure you pass through recruiter filters."
            />
            <FeatureCard 
              icon={Globe}
              title="Portfolio Builder"
              description="Create a personal portfolio website instantly to showcase your projects and achievements."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-gray-900">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            {[
              { step: "01", title: "Create Profile", desc: "Fill in your background and skills" },
              { step: "02", title: "Generate Resume", desc: "AI crafts your perfect resume" },
              { step: "03", title: "Share Portfolio", desc: "Showcase your work to the world" }
            ].map((item, index) => (
              <div key={index} className="flex-1 relative group">
                <div className="text-6xl font-black text-gray-100 absolute -top-10 left-1/2 -translate-x-1/2 group-hover:text-indigo-50 transition-colors">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
