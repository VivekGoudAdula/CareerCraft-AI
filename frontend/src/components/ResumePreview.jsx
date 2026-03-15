import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, Globe } from 'lucide-react';

const ResumePreview = ({ data, user, profile }) => {
  if (!data) return (
    <div className="h-full flex flex-col items-center justify-center text-gray-300 min-h-[700px] border-2 border-dashed border-gray-100 rounded-[2.5rem]">
      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
        <span className="text-2xl">📄</span>
      </div>
      <p className="font-medium italic">Your architectural masterpiece will appear here.</p>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-12 md:p-16 rounded-[2.5rem] shadow-2xl shadow-indigo-100 border border-gray-100 min-h-[1000px] text-[#2d3748] font-inter relative overflow-hidden"
    >
      {/* Premium Watermark/Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-bl-[5rem] -mr-10 -mt-10"></div>

      {/* Header */}
      <div className="border-b-2 border-gray-100 pb-10 mb-10 text-center">
        <h2 className="text-4xl font-black uppercase tracking-tight text-gray-900 font-outfit mb-4">
          {user?.name || "Vivek Goud Adula"}
        </h2>
        
        {/* Contact Links */}
        <div className="flex flex-wrap justify-center gap-y-4 gap-x-8 text-[11px] font-bold text-gray-500 tracking-wider">
          {user?.email && (
            <a href={`mailto:${user.email}`} className="flex items-center gap-2 hover:text-indigo-600 transition-colors">
              <Mail className="w-3.5 h-3.5" />
              {user.email}
            </a>
          )}
          {profile?.mobile && (
            <span className="flex items-center gap-2 hover:text-indigo-600 transition-colors">
              <Phone className="w-3.5 h-3.5 text-indigo-400" />
              {profile.mobile}
            </span>
          )}
          {profile?.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-indigo-600 transition-colors">
              <Linkedin className="w-3.5 h-3.5" />
              LinkedIn
            </a>
          )}
          {profile?.github && (
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-indigo-600 transition-colors">
              <Github className="w-3.5 h-3.5" />
              GitHub
            </a>
          )}
        </div>

      </div>

      <div className="space-y-12">
        {/* Summary */}
        <section>
          <div className="flex items-center gap-4 mb-4">
            <h3 className="text-xs font-black uppercase tracking-[0.35em] text-indigo-600">Executive Briefing</h3>
            <span className="flex-1 h-[1px] bg-gray-50"></span>
          </div>
          <p className="text-[15px] leading-relaxed text-gray-600 font-medium italic border-l-4 border-indigo-100 pl-6 py-1">
            "{data.summary}"
          </p>
        </section>

        {/* Experience */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-xs font-black uppercase tracking-[0.35em] text-indigo-600">Strategic Impact</h3>
            <span className="flex-1 h-[1px] bg-gray-50"></span>
          </div>
          <div className="space-y-10">
            {data.experience?.map((exp, i) => (
              <div key={i} className="group relative">
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="font-bold text-gray-900 text-lg group-hover:text-indigo-600 transition-colors">{exp.role}</h4>
                  <span className="text-[10px] font-black text-indigo-400 bg-indigo-50 px-2 py-1 rounded tracking-tighter uppercase">{exp.duration}</span>
                </div>
                <p className="text-sm font-black text-gray-400 mb-4 uppercase tracking-widest">{exp.company}</p>
                <ul className="space-y-3">
                  {(exp.points || exp.achievements)?.map((point, j) => (
                    <li key={j} className="text-sm text-gray-500 flex gap-4 leading-relaxed group-hover:text-gray-600 transition-colors">
                      <span className="text-indigo-400 font-black mt-0.5 opacity-50">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Skills & Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <section>
            <div className="flex items-center gap-4 mb-6">
              <h3 className="text-xs font-black uppercase tracking-[0.35em] text-indigo-600">Core Stack</h3>
              <span className="flex-1 h-[1px] bg-gray-50"></span>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.skills?.map((skill, i) => (
                <span key={i} className="text-[10px] font-black uppercase bg-white text-gray-900 border-2 border-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-900 hover:text-white transition-all transform hover:-translate-y-0.5">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <h3 className="text-xs font-black uppercase tracking-[0.35em] text-indigo-600">Qualifications</h3>
              <span className="flex-1 h-[1px] bg-gray-50"></span>
            </div>
            <div className="space-y-6">
              {Array.isArray(data.education) ? data.education.map((edu, i) => (
                <div key={i} className="relative pl-6 border-l-2 border-gray-100 group hover:border-indigo-600 transition-colors">
                  <h4 className="font-bold text-gray-900 text-sm leading-tight mb-1">{edu.degree}</h4>
                  <p className="text-xs text-indigo-600 font-bold mb-1">{edu.college || edu.school}</p>
                  <p className="text-[10px] text-gray-400 font-black tracking-widest">{edu.year}</p>
                </div>
              )) : (
                <div className="relative pl-6 border-l-2 border-gray-100 group hover:border-indigo-600 transition-colors">
                   <h4 className="font-bold text-gray-900 text-sm leading-tight mb-1">{data.education?.degree}</h4>
                   <p className="text-xs text-indigo-600 font-bold mb-1">{data.education?.college || data.education?.school}</p>
                   <p className="text-[10px] text-gray-400 font-black tracking-widest">{data.education?.year}</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Projects */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-xs font-black uppercase tracking-[0.35em] text-indigo-600">Project Highlights</h3>
            <span className="flex-1 h-[1px] bg-gray-50"></span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.projects?.map((proj, i) => (
              <div key={i} className="p-8 rounded-3xl border border-gray-100 bg-white hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-50 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-black text-gray-900 group-hover:text-indigo-600 transition-colors font-outfit uppercase tracking-tight">{proj.name}</h4>
                </div>
                <div className="inline-block px-2.5 py-1 bg-gray-900 text-[9px] font-black text-white italic rounded mb-4 tracking-widest">
                  {proj.tech}
                </div>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-24 pt-10 border-t border-gray-100 text-center opacity-40">
         <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.8em]">Architectural System v2.0</p>
      </div>
    </motion.div>
  );
};

export default ResumePreview;
