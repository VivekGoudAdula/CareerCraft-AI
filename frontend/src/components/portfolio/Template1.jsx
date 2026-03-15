import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Code, Terminal, Cpu, Layers, Box, Zap, Command, ChevronRight, GraduationCap, Award, Heart } from 'lucide-react';

const Template1 = ({ data }) => {
  const { name, role, about, skills, projects, experience, education, achievements, hobbies, contact } = data;

  return (
    <div className="bg-[#020617] text-white min-h-screen font-inter selection:bg-indigo-500/30 selection:text-white cyber-grid">
      {/* Premium Navbar */}
      <nav className="p-6 border-b border-white/5 flex justify-between items-center sticky top-0 bg-[#020617]/80 backdrop-blur-xl z-40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.4)]">
            <Command className="w-6 h-6 text-white" />
          </div>
          <div className="text-xl font-black font-outfit tracking-tighter">
            {name.split(' ')[0]}<span className="text-indigo-500">_</span>
          </div>
        </div>
        <div className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
          <a href="#about" className="hover:text-indigo-400 transition-colors">Stack</a>
          <a href="#experience" className="hover:text-indigo-400 transition-colors">Tenure</a>
          <a href="#projects" className="hover:text-indigo-400 transition-colors">Innovations</a>
          <a href="#academic" className="hover:text-indigo-400 transition-colors">Academic</a>
        </div>
        <button className="bg-white/5 hover:bg-white/10 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10 transition-all">
          Resume.pdf
        </button>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-24 space-y-40">
        {/* Futuristic Hero */}
        <section className="relative min-h-[60vh] flex flex-col justify-center">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute top-40 -left-40 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[100px]"></div>
          
          <div className="relative z-10 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-6 leading-none">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                Available for meaningful work
              </div>
              <h1 className="text-7xl md:text-[10rem] font-black font-outfit leading-[0.8] tracking-tighter mb-8">
                {name.split(' ')[0]}<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                  {name.split(' ').slice(1).join(' ')}
                </span>
              </h1>
              <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-400 font-outfit uppercase tracking-tighter">
                  {role}
                </h3>
                <div className="h-px flex-1 bg-white/10 hidden md:block"></div>
                <div className="flex gap-4">
                  {contact.github && <a href={contact.github} target="_blank" rel="noreferrer"><Github className="w-6 h-6 text-gray-600 hover:text-white transition-colors cursor-pointer" /></a>}
                  {contact.linkedin && <a href={contact.linkedin} target="_blank" rel="noreferrer"><Linkedin className="w-6 h-6 text-gray-600 hover:text-white transition-colors cursor-pointer" /></a>}
                </div>
              </div>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-400 max-w-2xl text-xl leading-relaxed font-medium"
            >
              {about}
            </motion.p>
          </div>
        </section>

        {/* Dynamic Skills */}
        <section id="about" className="space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <p className="text-indigo-500 font-black uppercase tracking-[0.4em] text-[10px]">Technical Stack</p>
              <h2 className="text-5xl font-black font-outfit tracking-tighter italic">Engine Components</h2>
            </div>
            <p className="text-gray-500 max-w-sm text-sm font-medium">
              I specialize in building high-performance systems using modern architectural patterns.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {skills.map((skill, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05, borderColor: 'rgba(99,102,241,0.5)' }}
                className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center transition-all group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="text-sm font-bold text-gray-300 relative z-10">{skill}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Professional Experience */}
        <section id="experience" className="bg-white/5 rounded-[3rem] p-12 md:p-20 border border-white/5 relative overflow-hidden">
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-indigo-500/5 rounded-full blur-[80px]"></div>
          
          <h2 className="text-5xl font-black font-outfit tracking-tighter mb-20">Career Trajectory</h2>
          
          <div className="space-y-20 relative">
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block"></div>
            
            {experience.map((exp, i) => (
              <div key={i} className={`flex flex-col md:flex-row items-center gap-12 relative ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                <div className="absolute left-[-5px] md:left-1/2 w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.8)] -translate-x-1/2 z-10 hidden md:block"></div>
                
                <div className="w-full md:w-1/2 space-y-4 text-center md:text-right group">
                  <div className={`flex flex-col ${i % 2 === 0 ? 'md:items-end' : 'md:items-start'}`}>
                    <p className="text-indigo-500 font-mono text-sm tracking-tighter mb-2">{exp.duration}</p>
                    <h4 className="text-3xl font-black font-outfit group-hover:text-indigo-400 transition-colors uppercase tracking-tighter">
                      {exp.role}
                    </h4>
                    <p className="text-xl font-bold text-gray-400">{exp.company}</p>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-md mx-auto md:ml-auto md:mr-0 group-hover:text-gray-300 transition-colors">
                    Led mission-critical developments and architected scalable solutions for high-traffic environments.
                  </p>
                </div>
                <div className="w-full md:w-1/2 hidden md:block"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="space-y-16">
          <div className="flex items-center gap-6">
            <h2 className="text-5xl font-black font-outfit tracking-tighter">Innovations</h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="group relative p-10 rounded-[2.5rem] bg-[#0f172a]/50 border border-white/5 hover:border-indigo-500/30 transition-all overflow-hidden glow-card"
              >
                <div className="w-16 h-16 bg-indigo-600/10 rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                  <Box className="w-8 h-8 text-indigo-500" />
                </div>
                <h4 className="text-3xl font-black mb-4 font-outfit tracking-tight group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h4>
                <p className="text-gray-400 text-lg leading-relaxed mb-10 opacity-80 group-hover:opacity-100 transition-opacity">
                   Strategic implementation focused on {project.tech.split(',')[0]} and modern UX principles.
                </p>
                <div className="flex flex-wrap gap-3">
                  {project.tech.split(',').map((t, j) => (
                    <span key={j} className="text-[10px] uppercase font-black tracking-widest text-indigo-400 bg-indigo-400/5 border border-indigo-400/10 px-4 py-2 rounded-full">
                      {t.trim()}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Academic & Achievements */}
        <section id="academic" className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="p-10 rounded-[3rem] bg-indigo-600/5 border border-white/5 space-y-10">
            <div className="flex items-center gap-4 mb-2">
              <GraduationCap className="w-10 h-10 text-indigo-500" />
              <h3 className="text-3xl font-black font-outfit">Academic</h3>
            </div>
            <div className="space-y-8">
              {Object.entries(education).map(([key, value], i) => value && (
                <div key={i} className="border-l-2 border-indigo-500/20 pl-6 space-y-1">
                  <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">{key}</p>
                  <p className="text-lg font-bold">{value}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-10 rounded-[3rem] bg-purple-600/5 border border-white/5 space-y-10">
            <div className="flex items-center gap-4 mb-2">
              <Award className="w-10 h-10 text-purple-500" />
              <h3 className="text-3xl font-black font-outfit">Vanguard</h3>
            </div>
            <div className="space-y-6">
              {achievements.length > 0 ? achievements.map((ach, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 shrink-0"></div>
                  <div>
                    <p className="text-lg font-bold">{ach.title}</p>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">{ach.provider}</p>
                  </div>
                </div>
              )) : <p className="text-gray-500 italic">No achievements listed yet.</p>}
            </div>
          </div>
        </section>

        {/* Hobbies & Leisure */}
        {hobbies.length > 0 && (
          <section className="text-center space-y-12">
             <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-pink-500/5 border border-pink-500/10 text-pink-500 text-[10px] font-black uppercase tracking-[0.4em]">
              <Heart className="w-4 h-4 fill-pink-500/20" /> Beyond the Screen
             </div>
             <div className="flex flex-wrap justify-center gap-4">
                {hobbies.map((hobby, i) => (
                  <span key={i} className="px-8 py-4 rounded-2xl bg-white/5 border border-white/5 text-xl font-bold hover:scale-105 transition-transform cursor-default">
                    {hobby}
                  </span>
                ))}
             </div>
          </section>
        )}

        {/* Contact */}
        <section id="contact" className="py-20">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[3rem] p-12 md:p-24 text-center shadow-[0_20px_60px_-15px_rgba(79,70,229,0.5)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="relative z-10"
            >
              <h2 className="text-indigo-200 font-black uppercase tracking-[0.5em] text-[10px] mb-8">Synchronize</h2>
              <h3 className="text-5xl md:text-7xl font-black font-outfit mb-12 tracking-tighter leading-none">
                Bring the vision <br/> to reality.
              </h3>
              <div className="flex flex-col md:flex-row justify-center gap-6">
                <a href={`mailto:${contact.email}`} className="bg-white text-indigo-600 hover:scale-105 px-12 py-5 rounded-2xl font-black font-outfit transition-all uppercase tracking-widest flex items-center justify-center gap-3">
                  Initiate Project <ChevronRight className="w-5 h-5" />
                </a>
                <div className="flex gap-4 justify-center">
                   {contact.linkedin && (
                     <a href={contact.linkedin} target="_blank" rel="noreferrer" className="w-16 h-16 rounded-2xl bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-black/40 transition-all cursor-pointer">
                        <Linkedin className="w-6 h-6" />
                     </a>
                   )}
                   {contact.github && (
                     <a href={contact.github} target="_blank" rel="noreferrer" className="w-16 h-16 rounded-2xl bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-black/40 transition-all cursor-pointer">
                        <Github className="w-6 h-6" />
                     </a>
                   )}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <footer className="pt-20 border-t border-white/5 text-center pb-20">
          <p className="text-[10px] font-black text-gray-700 uppercase tracking-[0.6em] mb-4">
            Forged in the CareerCraft Ecosystem &bull; {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Template1;
