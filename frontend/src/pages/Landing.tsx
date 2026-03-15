import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ChevronRight, Sparkles, Target, Zap, Globe } from "lucide-react";

export default function Landing() {
  return (
    <div className="flex flex-col gap-20 py-12">
      {/* Hero Section */}
      <section className="text-center flex flex-col items-center gap-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium border border-emerald-100"
        >
          <Sparkles size={14} />
          <span>New: AI-Powered Portfolio Generator</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]"
        >
          Generate <span className="text-emerald-600">ATS-Optimized</span> Resumes and Portfolios with AI
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-[#6C757D] max-w-2xl"
        >
          CareerCraft AI helps you land your dream job by crafting professional resumes 
          and stunning portfolios tailored to your unique skills and experience.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mt-4"
        >
          <Link
            to="/profile"
            className="px-8 py-4 bg-black text-white rounded-xl font-semibold text-lg hover:bg-[#333] transition-all flex items-center gap-2 shadow-lg shadow-black/10"
          >
            Get Started
            <ChevronRight size={20} />
          </Link>
          <button className="px-8 py-4 bg-white border border-[#E9ECEF] rounded-xl font-semibold text-lg hover:bg-[#F8F9FA] transition-all">
            View Templates
          </button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: Target,
            title: "ATS Optimized",
            description: "Our AI ensures your resume passes through Applicant Tracking Systems with flying colors.",
            color: "bg-blue-50 text-blue-600"
          },
          {
            icon: Zap,
            title: "Instant Generation",
            description: "Go from raw data to a polished professional resume in seconds, not hours.",
            color: "bg-amber-50 text-amber-600"
          },
          {
            icon: Globe,
            title: "Live Portfolios",
            description: "Automatically generate a web-ready portfolio to showcase your projects to the world.",
            color: "bg-purple-50 text-purple-600"
          }
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="p-8 bg-white rounded-2xl border border-[#E9ECEF] hover:shadow-xl hover:shadow-black/5 transition-all group"
          >
            <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <feature.icon size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-[#6C757D] leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </section>

      {/* Social Proof / Stats */}
      <section className="bg-black rounded-[2rem] p-12 text-white text-center overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500 rounded-full blur-[100px]" />
        </div>
        
        <div className="relative z-10 grid md:grid-cols-3 gap-12">
          <div>
            <div className="text-4xl font-bold mb-2">50k+</div>
            <div className="text-gray-400">Resumes Generated</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">92%</div>
            <div className="text-gray-400">Interview Success Rate</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">150+</div>
            <div className="text-gray-400">Industry Templates</div>
          </div>
        </div>
      </section>
    </div>
  );
}
