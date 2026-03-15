import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, ArrowRight, AlignLeft, Globe, Award, Sparkles, Download } from 'lucide-react';

const downloadResume = async (userId) => {
  if (!userId) return;
  try {
    const response = await fetch(`http://localhost:8000/export-resume/${userId}`);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'resume.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Resume download failed:', err);
  }
};

const Template2 = ({ data }) => {
  const { user_id, name, role, about, skills, projects, experience, education, achievements, hobbies, contact } = data;
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    await downloadResume(user_id);
    setDownloading(false);
  };

  return (
    <div className="bg-[#fafaf9] text-[#1c1917] min-h-screen font-inter selection:bg-stone-200">
      {/* Editorial Navbar */}
      <nav className="px-8 md:px-20 py-10 flex justify-between items-end border-b border-stone-200">
        <div>
           <h1 className="text-4xl font-black font-['DM_Serif_Display'] leading-none">
            {name.split(' ')[0]}<br/>
            {name.split(' ').slice(1).join(' ')}
          </h1>
        </div>
        <div className="flex flex-col items-end gap-2 text-right">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">Available globally</p>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest cursor-pointer">
            <span className="hover:text-stone-500 transition-colors">Works</span>
            <span className="hover:text-stone-500 transition-colors">Career</span>
            <span className="hover:text-stone-500 transition-colors">About</span>
          </div>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="mt-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest border-b-2 border-stone-900 pb-0.5 hover:text-stone-400 hover:border-stone-400 transition-all disabled:opacity-50"
          >
            <Download className="w-3 h-3" />
            {downloading ? 'Downloading...' : 'Download Resume'}
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 md:px-20">
        {/* Large Typography Hero */}
        <section className="py-32 grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
          <div className="md:col-span-8">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-9xl font-black font-['DM_Serif_Display'] leading-[0.9] tracking-tighter"
            >
              Building digital <br/> legacies with <br/> <span className="italic text-stone-400">precision.</span>
            </motion.h2>
          </div>
          <div className="md:col-span-4 pb-4">
             <div className="space-y-6">
                <div className="h-px w-20 bg-stone-900"></div>
                <p className="text-xl text-stone-600 font-medium leading-relaxed">
                  {about}
                </p>
                <div className="flex gap-4">
                  <a href={`mailto:${contact.email}`} className="text-sm font-black border-b-2 border-stone-900 pb-1">Email</a>
                  {contact.linkedin && <a href={contact.linkedin} target="_blank" rel="noreferrer" className="text-sm font-black border-b-2 border-stone-900 pb-1">LinkedIn</a>}
                </div>
             </div>
          </div>
        </section>

        {/* Selected Projects */}
        <section className="py-20 space-y-40">
           <div className="flex justify-between items-center border-b border-stone-200 pb-8">
              <h3 className="text-sm font-black uppercase tracking-[0.4em]">Selected Output</h3>
              <p className="text-stone-400 text-xs italic">Scroll to explore</p>
           </div>

           {projects.map((project, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ amount: 0.3 }}
               className="grid grid-cols-1 md:grid-cols-12 gap-12 group"
             >
               <div className="md:col-span-1 text-sm font-black text-stone-300">0{i+1}/</div>
               <div className="md:col-span-5 space-y-10 order-2 md:order-1">
                  <div>
                    <h4 className="text-4xl md:text-6xl font-black font-['DM_Serif_Display'] mb-6 group-hover:italic transition-all">
                      {project.title}
                    </h4>
                    <p className="text-stone-500 font-medium leading-relaxed max-w-sm">
                      Strategic architectural implementation using {project.tech}. A case study in minimalism and efficiency.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.split(',').map((t, j) => (
                      <span key={j} className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">
                        {t.trim()} {j < project.tech.split(',').length - 1 && "—"}
                      </span>
                    ))}
                  </div>
                  <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest border border-stone-200 px-6 py-3 rounded-full hover:bg-stone-900 hover:text-white transition-all">
                    View Case <ArrowRight className="w-4 h-4" />
                  </button>
               </div>
               <div className="md:col-span-6 bg-stone-100 aspect-square md:aspect-video rounded-2xl overflow-hidden relative order-1 md:order-2">
                  <div className="absolute inset-0 bg-gradient-to-tr from-stone-900/10 to-transparent"></div>
                  <div className="absolute inset-x-10 inset-y-10 border border-white/20 rounded-xl flex items-center justify-center">
                    <AlignLeft className="w-20 h-20 text-white/10" />
                  </div>
               </div>
             </motion.div>
           ))}
        </section>

        {/* Methodology & Expertise */}
        <section className="py-40 grid grid-cols-1 md:grid-cols-12 gap-20">
          <div className="md:col-span-12 lg:col-span-5">
             <h3 className="text-6xl font-black font-['DM_Serif_Display'] mb-12">Methodology &<br/>Expertise</h3>
             <p className="text-stone-500 leading-relaxed font-medium">
               Over the years, I've developed a rigorous approach to system design, balancing cutting-edge technology with timeless principles.
             </p>
          </div>
          <div className="md:col-span-12 lg:col-span-7">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-20">
                {skills.map((skill, i) => (
                  <div key={i} className="group cursor-default">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-2 h-2 rounded-full bg-stone-900 group-hover:scale-150 transition-transform"></div>
                      <h5 className="text-lg font-black uppercase tracking-tighter">{skill}</h5>
                    </div>
                    <div className="h-px w-full bg-stone-200 group-hover:bg-stone-900 transition-colors"></div>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* Career & Academic Tenure */}
        <section className="py-20 border-t border-stone-200">
          <div className="flex flex-col lg:flex-row gap-20">
             <div className="lg:w-1/3">
                <h3 className="text-xs font-black uppercase tracking-[0.5em] text-stone-400 lg:sticky lg:top-40">Tenure & Academy</h3>
             </div>
             <div className="lg:w-2/3 space-y-32">
                {/* Experience */}
                <div className="space-y-32">
                  {experience.map((exp, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      className="group"
                    >
                      <div className="flex justify-between items-end mb-8">
                         <h4 className="text-4xl md:text-5xl font-black font-['DM_Serif_Display']">{exp.company}</h4>
                         <span className="text-xs font-bold text-stone-400 italic">{exp.duration}</span>
                      </div>
                      <p className="text-2xl font-bold uppercase tracking-tighter mb-4 text-stone-400 group-hover:text-stone-900 transition-colors">{exp.role}</p>
                      <p className="text-stone-500 max-w-xl font-medium leading-relaxed">
                        Strategic lead for core infrastructure projects, focusing on high-level architecture and organizational growth.
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Education */}
                <div className="pt-20 border-t border-stone-100">
                  <h4 className="text-3xl font-black font-['DM_Serif_Display'] mb-12">Academic Credentials</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    {Object.entries(education).map(([key, value], i) => value && (
                      <div key={i} className="space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">{key}</p>
                        <p className="text-lg font-bold uppercase tracking-tighter">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
             </div>
          </div>
        </section>

        {/* Achievements & Hobbies - Editorial Grid */}
        <section className="py-40 grid grid-cols-1 lg:grid-cols-2 gap-20 border-t border-stone-200">
           {/* Achievements */}
           <div className="space-y-12">
              <h3 className="text-sm font-black uppercase tracking-[0.4em] flex items-center gap-3">
                <Award className="w-5 h-5" /> Recognition
              </h3>
              <div className="space-y-8">
                {achievements.map((ach, i) => (
                  <div key={i} className="flex gap-6 group">
                    <span className="text-stone-300 font-bold italic text-sm pt-1">0{i+1}</span>
                    <div>
                      <h5 className="text-2xl font-black font-['DM_Serif_Display'] group-hover:italic transition-all">{ach.title}</h5>
                      <p className="text-stone-400 text-xs font-bold uppercase tracking-widest">{ach.provider}</p>
                    </div>
                  </div>
                ))}
              </div>
           </div>

           {/* Hobbies */}
           <div className="space-y-12">
              <h3 className="text-sm font-black uppercase tracking-[0.4em] flex items-center gap-3">
                <Sparkles className="w-5 h-5" /> Philosophy
              </h3>
              <div className="flex flex-wrap gap-10">
                {hobbies.map((hobby, i) => (
                  <div key={i} className="space-y-2">
                    <h5 className="text-3xl font-black font-['DM_Serif_Display'] italic">{hobby}</h5>
                    <div className="h-px w-full bg-stone-200"></div>
                  </div>
                ))}
              </div>
           </div>
        </section>

        {/* Final Contact */}
        <section className="py-60 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.6em] text-stone-400 mb-10">Inquiry</p>
            <h3 className="text-6xl md:text-9xl font-black font-['DM_Serif_Display'] tracking-tighter mb-20 leading-none">
              Let's craft the <br/> next <span className="italic text-stone-400">chapter.</span>
            </h3>
            <div className="flex flex-col md:flex-row justify-center gap-12 items-center">
              <a href={`mailto:${contact.email}`} className="text-3xl font-black border-b-4 border-stone-900 pb-2 hover:text-stone-400 hover:border-stone-400 transition-all">
                {contact.email}
              </a>
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="flex items-center gap-3 bg-stone-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-stone-700 transition-all disabled:opacity-50"
              >
                <Download className="w-5 h-5" />
                {downloading ? 'Downloading...' : 'Download Resume'}
              </button>
              <div className="flex gap-8">
                {contact.github && <a href={contact.github} target="_blank" rel="noreferrer"><Github className="w-8 h-8 hover:scale-125 transition-transform cursor-pointer" /></a>}
                {contact.linkedin && <a href={contact.linkedin} target="_blank" rel="noreferrer"><Linkedin className="w-8 h-8 hover:scale-125 transition-transform cursor-pointer" /></a>}
                <Globe className="w-8 h-8 hover:scale-125 transition-transform cursor-pointer" />
              </div>
            </div>
        </section>

        <footer className="py-20 border-t border-stone-200 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-stone-300">
           <span>{name} © {new Date().getFullYear()}</span>
           <span>Studio Edition 02</span>
           <span>Global/EN</span>
        </footer>
      </div>
    </div>
  );
};

export default Template2;
