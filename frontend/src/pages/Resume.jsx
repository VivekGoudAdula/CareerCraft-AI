import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Sparkles, User, Briefcase, Code, GraduationCap, Loader2, Linkedin, Github } from 'lucide-react';
import api from '../services/api';
import { generateResume, getResume, downloadResume, getAtsScore } from '../services/resumeApi';
import ResumePreview from '../components/ResumePreview';
import AtsScore from '../components/AtsScore';
import AppNavbar from '../components/AppNavbar';

const Resume = () => {
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [resumeData, setResumeData] = useState(null);
  const [atsData, setAtsData] = useState({ score: 0, suggestions: [] });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const userName = localStorage.getItem('userName');
        const userEmail = localStorage.getItem('userEmail') || '';
        
        if (!userId) return;
        
        const userData = { id: userId, name: userName, email: userEmail };
        setUser(userData);

        try {
          const profileRes = await api.get(`/profile/${userId}`);
          setProfile(profileRes.data);
        } catch (profileErr) {
          if (profileErr?.response?.status === 404) {
            // User hasn't completed onboarding yet — not a fatal error
            setProfile(null);
          } else {
            console.error("Error fetching profile:", profileErr);
          }
        }

        try {
          const resumeRes = await getResume(userId);
          setResumeData(resumeRes);
          
          const atsRes = await getAtsScore(userId);
          setAtsData(atsRes);
        } catch (err) {
          // No resume generated yet — expected for new users
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, []);

  const handleGenerate = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await generateResume(user.id);
      setResumeData(res.resume);
      setAtsData({ score: res.ats_score, suggestions: res.suggestions });
    } catch (err) {
      console.error("Error generating resume:", err);
      alert("Failed to generate resume. Please ensure your profile is complete.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!user) return;
    try {
      await downloadResume(user.id);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  if (fetching) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfcfd]">
      <div className="relative w-20 h-20 mb-4">
        <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="text-gray-500 font-medium animate-pulse">Loading your workspace...</p>
    </div>
  );

  // User hasn't completed onboarding — no profile exists yet
  if (!profile) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfcfd] font-inter text-center px-6">
      <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
        <User className="w-10 h-10 text-indigo-400" />
      </div>
      <h2 className="text-3xl font-black text-gray-900 mb-3 font-outfit">Profile Not Found</h2>
      <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
        You haven't completed your profile yet. Please go through the onboarding steps first so our AI can generate a tailored resume for you.
      </p>
      <button
        onClick={() => window.location.href = '/onboarding'}
        className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-200"
      >
        Complete Onboarding →
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fcfcfd] text-[#0f172a] font-inter">
      <AppNavbar />
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute top-[20%] -right-[5%] w-[35%] h-[35%] bg-pink-50 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] bg-blue-50 rounded-full blur-[120px] opacity-60"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-bold uppercase tracking-widest mb-4">
              <Sparkles className="w-3 h-3" /> AI Workspace
            </div>
            <h1 className="text-4xl md:text-5xl font-black font-outfit tracking-tight text-gray-900 mb-2">
              Resume <span className="gradient-text">Architect</span>
            </h1>
            <p className="text-gray-500 font-medium max-w-md">
              We've analyzed your profile. Click generate to craft your high-performance, ATS-optimized resume.
            </p>
          </motion.div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGenerate}
              disabled={loading}
              className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-2xl font-bold transition-all disabled:opacity-50 shadow-xl shadow-gray-200"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                  Generate Resume
                </>
              )}
            </motion.button>
            {resumeData && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownload}
                className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 px-8 py-4 rounded-2xl font-bold transition-all shadow-sm"
              >
                <Download className="w-5 h-5" />
                Download
              </motion.button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Panel: Profile Info */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-8 rounded-[2rem] border-white/50"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 border border-white/20">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg font-outfit uppercase tracking-tight">Identity</h3>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Base Profile</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1.5 block">Full Name</label>
                  <p className="text-gray-900 font-bold text-lg">{user?.name}</p>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1.5 block">Email Address</label>
                  <p className="text-gray-600 font-medium break-all">{user?.email}</p>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1.5 block">Objective</label>
                  <p className="text-indigo-600 font-black text-lg">{profile?.target_role || "Career Seeker"}</p>
                </div>
                {(profile?.linkedin || profile?.github) && (
                  <div className="pt-4 flex gap-4">
                    {profile?.linkedin && (
                      <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 hover:bg-indigo-50 transition-colors cursor-pointer group">
                        <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-indigo-600" />
                      </a>
                    )}
                    {profile?.github && (
                      <a href={profile.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 hover:bg-gray-100 transition-colors cursor-pointer group">
                        <Github className="w-5 h-5 text-gray-400 group-hover:text-gray-900" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-8 rounded-[2rem] border-white/50"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-200 border border-white/20">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg font-outfit uppercase tracking-tight">Stack</h3>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Capabilities</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {profile?.skills && profile.skills.split(',').map((skill, i) => (
                  <span key={i} className="bg-white/50 border border-gray-100 text-gray-700 px-4 py-1.5 rounded-xl text-xs font-bold shadow-sm backdrop-blur-sm">
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-8 rounded-[2rem] border-white/50"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-100 border border-white/20">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg font-outfit uppercase tracking-tight">History</h3>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Experience</p>
                </div>
              </div>
              <div className="space-y-4">
                {Array.isArray(profile?.experience) ? profile.experience.map((exp, i) => (
                  <div key={i} className="border-l-2 border-orange-100 pl-4 py-1">
                    <p className="text-sm font-bold text-gray-800 leading-tight">{exp.role}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{exp.company} • {exp.duration}</p>
                  </div>
                )) : <p className="text-sm text-gray-600 line-clamp-3">{profile?.experience}</p>}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-8 rounded-[2rem] border-white/50"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-100 border border-white/20">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg font-outfit uppercase tracking-tight">Showcase</h3>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Projects</p>
                </div>
              </div>
              <div className="space-y-4">
                {Array.isArray(profile?.projects) ? profile.projects.map((proj, i) => (
                  <div key={i} className="border-l-2 border-green-100 pl-4 py-1">
                    <p className="text-sm font-bold text-gray-800 leading-tight">{proj.title}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{proj.tech}</p>
                  </div>
                )) : <p className="text-sm text-gray-600 line-clamp-3">{profile?.projects}</p>}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-8 rounded-[2rem] border-white/50"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100 border border-white/20">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg font-outfit uppercase tracking-tight">Academic</h3>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Education</p>
                </div>
              </div>
              <div className="space-y-4">
                {profile?.education && (
                  <>
                    {profile.education.btech?.name && (
                      <div className="border-l-2 border-blue-100 pl-4 py-1">
                        <p className="text-sm font-bold text-gray-800 leading-tight">B.Tech / Degree</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                          {profile.education.btech.name} {profile.education.btech.branch && `• ${profile.education.btech.branch}`} ({profile.education.btech.year})
                        </p>
                      </div>
                    )}
                    {profile.education.intermediate?.name && (
                      <div className="border-l-2 border-blue-50 pl-4 py-1">
                        <p className="text-sm font-bold text-gray-800 leading-tight">Intermediate / 12th</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                          {profile.education.intermediate.name} {profile.education.intermediate.board && `• ${profile.education.intermediate.board}`} ({profile.education.intermediate.year})
                        </p>
                      </div>
                    )}
                    {profile.education.school?.name && (
                      <div className="border-l-2 border-blue-50 pl-4 py-1">
                        <p className="text-sm font-bold text-gray-800 leading-tight">High School</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                          {profile.education.school.name} {profile.education.school.board && `• ${profile.education.school.board}`} ({profile.education.school.year})
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </motion.div>

            {profile?.achievements && profile.achievements.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-card p-8 rounded-[2rem] border-white/50"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-100 border border-white/20">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg font-outfit uppercase tracking-tight">Vanguard</h3>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Achievements</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {Array.isArray(profile.achievements) ? profile.achievements.map((ach, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5 shrink-0"></div>
                      <div>
                        <p className="text-xs text-gray-800 font-bold leading-tight">{ach.title}</p>
                        <p className="text-[10px] text-gray-400 font-medium">{ach.provider}</p>
                      </div>
                    </div>
                  )) : <p className="text-xs text-gray-600">{profile.achievements}</p>}
                </div>
              </motion.div>
            )}

            {profile?.hobbies && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="glass-card p-8 rounded-[2rem] border-white/50"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-100 border border-white/20">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg font-outfit uppercase tracking-tight">Leisure</h3>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Hobbies</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.hobbies.split(',').map((hobby, i) => (
                    <span key={i} className="text-[10px] font-bold bg-pink-50 text-pink-600 px-3 py-1 rounded-lg border border-pink-100">
                      {hobby.trim()}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {resumeData && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <AtsScore score={atsData.score} suggestions={atsData.suggestions} />
              </motion.div>
            )}
          </div>

          {/* Right Panel: Preview Area */}
          <div className="lg:col-span-8">
            {loading ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100 border border-gray-100 p-16 flex flex-col items-center justify-center min-h-[700px] text-center"
              >
                <div className="relative w-32 h-32 mb-10">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-[6px] border-indigo-50 rounded-full"
                  ></motion.div>
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-[6px] border-indigo-600 rounded-full border-t-transparent"
                  ></motion.div>
                  <Sparkles className="absolute inset-0 m-auto w-12 h-12 text-indigo-600 animate-pulse" />
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-4 font-outfit">Cultivating your Experience...</h3>
                <p className="text-gray-500 font-medium max-w-sm leading-relaxed">
                  Our LLM is currently restructuring your profile into a world-class professional narrative. This takes about 10 seconds.
                </p>
                <div className="mt-8 flex gap-2">
                  {[0, 1, 2].map(i => (
                    <motion.div 
                      key={i}
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                      className="w-3 h-3 bg-indigo-600 rounded-full"
                    ></motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative"
              >
                <ResumePreview 
                  data={resumeData} 
                  user={user}
                  profile={profile}
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
