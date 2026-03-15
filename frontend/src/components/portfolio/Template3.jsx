import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Heart, Zap, Github, Linkedin, MessageCircle, Star, ArrowUpRight, GraduationCap, Award, Compass, MousePointer2 } from 'lucide-react';

const Template3 = ({ data }) => {
  const { name, role, about, skills, projects, experience, education, achievements, hobbies, contact } = data;
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  return (
    <div ref={containerRef} className="bg-[#000000] text-white min-h-screen font-inter selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-indigo-600/20 rounded-full blur-[180px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-pink-600/20 rounded-full blur-[160px]"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
      </div>

      {/* Floating UI Elements */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-6 bg-white/10 backdrop-blur-2xl border border-white/10 px-10 py-4 rounded-full shadow-2xl">
        <a href="#projects" className="text-[10px] font-black uppercase tracking-widest hover:text-indigo-400 transition-colors">Visions</a>
        <div className="w-1 h-1 rounded-full bg-white/20"></div>
        <a href="#journey" className="text-[10px] font-black uppercase tracking-widest hover:text-indigo-400 transition-colors">Tenure</a>
        <div className="w-1 h-1 rounded-full bg-white/20"></div>
        <a href="#details" className="text-[10px] font-black uppercase tracking-widest hover:text-indigo-400 transition-colors">Intel</a>
        <div className="w-1 h-1 rounded-full bg-white/20"></div>
        <a href="#contact" className="text-[10px] font-black uppercase tracking-widest hover:text-indigo-400 transition-colors">Sync</a>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Sleek Hero */}
        <section className="min-h-screen flex flex-col justify-center py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-[0.4em] mb-12 animate-float">
              <Zap className="w-4 h-4 text-indigo-400 fill-indigo-400" /> Defining the Digital Edge
            </div>

            <h1 className="text-7xl md:text-[12rem] font-black font-outfit tracking-tighter leading-[0.85] mb-16">
              <span className="block">{name}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">
                {role}
              </span>
            </h1>

            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
               <p className="text-2xl md:text-4xl font-bold text-gray-500 max-w-3xl leading-[1.1] font-outfit">
                 {about}
               </p>
               <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all group cursor-pointer shadow-2xl">
                     <ArrowUpRight className="w-10 h-10 group-hover:rotate-45 transition-transform" />
                  </div>
               </div>
            </div>
          </motion.div>
          
          <div className="absolute bottom-20 left-0 flex items-center gap-6">
            <div className="flex -space-x-4">
               {skills.slice(0, 3).map((skill, i) => (
                 <div key={i} className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-[10px] font-black uppercase">
                   {skill.charAt(0)}
                 </div>
               ))}
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Core Matrix Active</p>
          </div>
        </section>

        {/* Dynamic Project Showcase */}
        <section id="projects" className="py-20">
           <div className="mb-32 flex flex-col md:flex-row md:items-end justify-between gap-10">
              <h2 className="text-6xl md:text-[9rem] font-black font-outfit tracking-tighter leading-none italic">Artistic<br/>Output</h2>
              <p className="text-gray-400 max-w-sm text-lg font-medium leading-relaxed">
                A curation of high-impact applications focused on scalability, performance, and delightful user experiences.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {projects.map((project, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -20 }}
                  className="group relative h-[600px] rounded-[4rem] overflow-hidden border border-white/5"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${i % 2 === 0 ? 'from-indigo-600/40 to-black' : 'from-pink-600/40 to-black'}`}></div>
                  
                  <div className="absolute inset-0 p-12 flex flex-col justify-between z-10">
                     <div className="flex justify-between items-start">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center">
                           <Star className="w-7 h-7 text-white" />
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Case Study 0{i+1}</div>
                     </div>
                     
                     <div>
                        <h4 className="text-4xl md:text-6xl font-black mb-6 font-outfit tracking-tighter group-hover:italic transition-all">
                          {project.title}
                        </h4>
                        <div className="flex flex-wrap gap-3 mb-10 opacity-0 group-hover:opacity-100 transition-opacity">
                           {project.tech.split(',').map((t, j) => (
                             <span key={j} className="text-[10px] font-black bg-white text-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                               {t.trim()}
                             </span>
                           ))}
                        </div>
                        <button className="flex items-center gap-3 text-xs font-black uppercase tracking-widest group/btn">
                           View Details <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-black transition-all"><ArrowUpRight className="w-4 h-4" /></div>
                        </button>
                     </div>
                  </div>
                </motion.div>
              ))}
           </div>
        </section>

        {/* The Matrix - Skills Marquee */}
        <section className="py-40 bg-white/5 rounded-[5rem] overflow-hidden relative border border-white/5 my-40">
           <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none"></div>
           <motion.div 
              animate={{ x: [0, -1500] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="flex gap-20 whitespace-nowrap text-[8rem] md:text-[15rem] font-black font-outfit text-white/5 tracking-tighter leading-none"
           >
              {skills.map((skill, i) => (
                <span key={i} className="hover:text-indigo-400 transition-colors">{skill}</span>
              ))}
              {skills.map((skill, i) => (
                <span key={i + 'clone'} className="hover:text-indigo-400 transition-colors">{skill}</span>
              ))}
           </motion.div>
        </section>

        {/* Tenure & Journey */}
        <section id="journey" className="py-20 grid grid-cols-1 md:grid-cols-2 gap-40">
           <div className="space-y-12">
              <div className="inline-flex items-center gap-3 text-indigo-400">
                 <MousePointer2 className="w-6 h-6 animate-bounce" />
                 <span className="text-xs font-black uppercase tracking-widest">User Journey</span>
              </div>
              <h3 className="text-5xl md:text-7xl font-black font-outfit tracking-tighter leading-none italic">
                Strategic evolution through <span className="text-indigo-500">elite</span> challenges.
              </h3>
              <div className="grid grid-cols-2 gap-6">
                 <div className="p-10 rounded-[4rem] bg-white/5 border border-white/10 space-y-4">
                    <Heart className="w-8 h-8 text-pink-500 fill-pink-500/20" />
                    <p className="text-3xl font-black font-outfit">100%</p>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Dedication</p>
                 </div>
                 <div className="p-10 rounded-[4rem] bg-indigo-600 text-white space-y-4 shadow-2xl shadow-indigo-600/40">
                    <Zap className="w-8 h-8 text-yellow-300 fill-yellow-300/20" />
                    <p className="text-3xl font-black font-outfit">2024</p>
                    <p className="text-[10px] font-black text-white/60 uppercase tracking-widest">Active State</p>
                 </div>
              </div>
           </div>
           <div className="space-y-16">
              {experience.map((exp, i) => (
                <div key={i} className="group border-b border-white/5 pb-10">
                   <p className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-4 italic">{exp.duration}</p>
                   <h4 className="text-4xl font-black font-outfit uppercase tracking-tighter group-hover:text-indigo-400 transition-colors mb-2">{exp.role}</h4>
                   <p className="text-xl font-bold text-gray-500 uppercase tracking-widest">{exp.company}</p>
                </div>
              ))}
           </div>
        </section>

        {/* Detailed Intel - Education, Hobbies, Achievements */}
        <section id="details" className="py-40 grid grid-cols-1 lg:grid-cols-3 gap-10">
           {/* Academy */}
           <div className="p-12 rounded-[4rem] bg-white/5 border border-white/5 space-y-12">
              <div className="flex items-center gap-4">
                 <GraduationCap className="w-10 h-10 text-indigo-500" />
                 <h3 className="text-2xl font-black uppercase tracking-tighter">Academy</h3>
              </div>
              <div className="space-y-10">
                {Object.entries(education).map(([key, value], i) => value && (
                  <div key={i} className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 italic">{key}</p>
                    <p className="text-xl font-bold uppercase tracking-tighter">{value}</p>
                  </div>
                ))}
              </div>
           </div>

           {/* Awards */}
           <div className="p-12 rounded-[4rem] bg-indigo-600 text-white space-y-12 shadow-2xl shadow-indigo-600/20">
              <div className="flex items-center gap-4">
                 <Award className="w-10 h-10 text-white" />
                 <h3 className="text-2xl font-black uppercase tracking-tighter">Vanguard</h3>
              </div>
              <div className="space-y-10">
                {achievements.map((ach, i) => (
                   <div key={i} className="space-y-2">
                      <p className="text-xl font-black uppercase tracking-tighter leading-tight">{ach.title}</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/40">{ach.provider}</p>
                   </div>
                ))}
              </div>
           </div>

           {/* Philosophy */}
           <div className="p-12 rounded-[4rem] bg-white text-black space-y-12 shadow-2xl">
              <div className="flex items-center gap-4">
                 <Compass className="w-10 h-10 text-black" />
                 <h3 className="text-2xl font-black uppercase tracking-tighter">Spirit</h3>
              </div>
              <div className="space-y-6">
                {hobbies.map((hobby, i) => (
                   <div key={i} className="flex items-center justify-between border-b border-black/5 pb-4">
                      <span className="text-xl font-black uppercase tracking-tighter italic">{hobby}</span>
                      <Sparkles className="w-5 h-5 text-gray-300" />
                   </div>
                ))}
              </div>
           </div>
        </section>

        {/* Immersive Contact */}
        <section id="contact" className="py-60 text-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-7xl md:text-[11rem] font-black font-outfit tracking-tighter mb-16 leading-none">
                Bring the <br/> <span className="text-indigo-500 italic">Vision.</span>
              </h2>
              <div className="flex flex-col items-center gap-16">
                 <a href={`mailto:${contact.email}`} className="text-3xl md:text-6xl font-black font-outfit hover:text-indigo-400 transition-colors tracking-tighter">
                   {contact.email}
                 </a>
                 <div className="flex gap-10">
                    {contact.github && (
                      <a href={contact.github} target="_blank" rel="noreferrer" className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                        <Github className="w-10 h-10" />
                      </a>
                    )}
                    {contact.linkedin && (
                      <a href={contact.linkedin} target="_blank" rel="noreferrer" className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center shadow-2xl shadow-indigo-600/40 hover:scale-110 transition-all">
                        <Linkedin className="w-10 h-10" />
                      </a>
                    )}
                    <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                       <MessageCircle className="w-10 h-10" />
                    </div>
                 </div>
              </div>
            </motion.div>
        </section>

        <footer className="py-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 text-[10px] font-black uppercase tracking-[0.6em] text-gray-700">
           <p>© {new Date().getFullYear()} Studio Matrix Edition</p>
           <div className="flex gap-12">
              <span className="hover:text-white cursor-pointer transition-colors">Twitter</span>
              <span className="hover:text-white cursor-pointer transition-colors">Dribbble</span>
              <span className="hover:text-white cursor-pointer transition-colors">Behance</span>
           </div>
           <p>CareerCraft AI Ecosystem</p>
        </footer>
      </div>
    </div>
  );
};

export default Template3;
