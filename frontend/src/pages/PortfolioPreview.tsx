import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code, 
  Briefcase, 
  User, 
  Send,
  AlertCircle
} from "lucide-react";
import { UserProfile, ResumeData } from "../types";
import { getPortfolio } from "../services/api";

export default function PortfolioPreview() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [resume, setResume] = useState<ResumeData | null>(null);

  const [portfolioData, setPortfolioData] = useState<any>(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem("career_craft_profile");
    if (savedProfile) {
      const p = JSON.parse(savedProfile);
      setProfile(p);
      fetchPortfolio(p.email);
    }
  }, []);

  const fetchPortfolio = async (email: string) => {
    try {
      const response = await getPortfolio(email);
      setPortfolioData(response.data);
    } catch (error) {
      console.error("Failed to fetch portfolio data", error);
    }
  };

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 bg-[#F1F3F5] rounded-full flex items-center justify-center mb-6">
          <AlertCircle size={40} className="text-[#6C757D]" />
        </div>
        <h2 className="text-2xl font-bold mb-2">No Profile Found</h2>
        <p className="text-[#6C757D] mb-8 max-w-md">
          Build your profile first to see your generated portfolio.
        </p>
        <a href="/profile" className="px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-[#333] transition-all">
          Go to Profile Builder
        </a>
      </div>
    );
  }

  const skills = profile.skills.split(",").map(s => s.trim());

  return (
    <div className="flex flex-col gap-16 py-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Portfolio Preview</h1>
          <p className="text-[#6C757D]">A modern, responsive layout for your professional presence.</p>
        </div>
        <button className="px-6 py-3 bg-black text-white rounded-xl font-semibold flex items-center gap-2 hover:bg-[#333] transition-all shadow-lg shadow-black/5">
          Publish Portfolio
          <ExternalLink size={18} />
        </button>
      </div>

      {/* Portfolio Mockup */}
      <div className="bg-white rounded-3xl border border-[#E9ECEF] shadow-2xl overflow-hidden">
        {/* Portfolio Header/Nav */}
        <nav className="px-8 py-6 border-b border-[#F1F3F5] flex justify-between items-center">
          <span className="font-bold text-xl">{profile.name.split(" ")[0]}.</span>
          <div className="flex gap-8 text-sm font-medium text-[#495057]">
            <a href="#about" className="hover:text-black transition-colors">About</a>
            <a href="#skills" className="hover:text-black transition-colors">Skills</a>
            <a href="#projects" className="hover:text-black transition-colors">Projects</a>
            <a href="#contact" className="hover:text-black transition-colors">Contact</a>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="about" className="px-8 py-20 md:py-32 flex flex-col items-center text-center gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-24 h-24 bg-black rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4"
          >
            {profile.name.charAt(0)}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tight"
          >
            Hi, I'm {profile.name}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[#6C757D] max-w-2xl"
          >
            A passionate <span className="text-black font-semibold">{profile.targetRole}</span> focused on building 
            exceptional digital experiences and solving complex problems.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex gap-4 mt-4"
          >
            <a href={`mailto:${profile.email}`} className="w-12 h-12 rounded-full border border-[#E9ECEF] flex items-center justify-center hover:bg-[#F8F9FA] transition-all">
              <Mail size={20} />
            </a>
            <a href="#" className="w-12 h-12 rounded-full border border-[#E9ECEF] flex items-center justify-center hover:bg-[#F8F9FA] transition-all">
              <Github size={20} />
            </a>
            <a href="#" className="w-12 h-12 rounded-full border border-[#E9ECEF] flex items-center justify-center hover:bg-[#F8F9FA] transition-all">
              <Linkedin size={20} />
            </a>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="px-8 py-20 bg-[#F8F9FA]">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-12 flex items-center gap-3">
              <Code className="text-emerald-500" /> Skills & Expertise
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {skills.map((skill, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-[#E9ECEF] text-center font-medium hover:shadow-lg hover:shadow-black/5 transition-all">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="px-8 py-20">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold mb-12 flex items-center gap-3">
              <Briefcase className="text-blue-500" /> Featured Projects
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Mocking projects from profile text */}
              {/* Use backend data if available, otherwise fallback to profile split */}
              {portfolioData ? (
                portfolioData.projects.map((proj: string, i: number) => (
                  <div key={i} className="group flex flex-col gap-4 p-6 rounded-3xl border border-[#E9ECEF] hover:border-black transition-all">
                    <div className="aspect-video bg-[#F1F3F5] rounded-2xl flex items-center justify-center overflow-hidden">
                      <FolderGit2 size={48} className="text-[#ADB5BD] group-hover:scale-110 transition-transform" />
                    </div>
                    <h4 className="text-xl font-bold">{proj.split(":")[0]}</h4>
                    <p className="text-[#6C757D] text-sm leading-relaxed">
                      {proj.split(":")[1] || "A professional project showcasing advanced technical implementation and problem-solving skills."}
                    </p>
                    <div className="flex gap-2 mt-2">
                       <span className="text-xs font-bold uppercase tracking-wider text-[#ADB5BD]">Tech Stack</span>
                    </div>
                  </div>
                ))
              ) : (
                profile.projects.split("\n").filter(p => p.trim()).map((proj, i) => (
                  <div key={i} className="group flex flex-col gap-4 p-6 rounded-3xl border border-[#E9ECEF] hover:border-black transition-all">
                    <div className="aspect-video bg-[#F1F3F5] rounded-2xl flex items-center justify-center overflow-hidden">
                      <FolderGit2 size={48} className="text-[#ADB5BD] group-hover:scale-110 transition-transform" />
                    </div>
                    <h4 className="text-xl font-bold">{proj.split(":")[0]}</h4>
                    <p className="text-[#6C757D] text-sm leading-relaxed">
                      {proj.split(":")[1] || "A professional project showcasing advanced technical implementation and problem-solving skills."}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#ADB5BD]">React</span>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#ADB5BD]">TypeScript</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="px-8 py-20 bg-black text-white">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
            <h3 className="text-3xl md:text-5xl font-bold">Let's work together</h3>
            <p className="text-gray-400 text-lg max-w-xl">
              I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="px-8 py-4 bg-white text-black rounded-xl font-bold text-lg hover:bg-gray-200 transition-all flex items-center gap-2"
            >
              Say Hello
              <Send size={20} />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

function FolderGit2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5" />
      <circle cx="18" cy="18" r="3" />
      <path d="M18 15v-1" />
      <path d="M15 18h-1" />
    </svg>
  );
}
