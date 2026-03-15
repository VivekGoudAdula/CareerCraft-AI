import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  FileText, 
  ChevronRight,
  Printer,
  Target
} from "lucide-react";
import { generateResumeFromBackend } from "../services/api";
import { UserProfile, ResumeData, ATSScore } from "../types";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function ResumeGenerator() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [atsScore, setAtsScore] = useState<ATSScore | null>(null);
  const [loading, setLoading] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("career_craft_profile");
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  const handleGenerate = async () => {
    if (!profile) return;
    setLoading(true);
    try {
      // Direct call to backend for generation + scoring + saving
      const response = await generateResumeFromBackend(profile.email);
      setResume(response.data.resume_data);
      setAtsScore({
        score: response.data.ats_score,
        suggestions: response.data.suggestions
      });
    } catch (error) {
      console.error("Generation failed", error);
      alert("Failed to generate resume. Please check your API key and try again.");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    if (!resumeRef.current) return;
    
    const canvas = await html2canvas(resumeRef.current, {
      scale: 2,
      useCORS: true,
      logging: false
    });
    
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${profile?.name.replace(/\s+/g, "_")}_Resume.pdf`);
  };

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 bg-[#F1F3F5] rounded-full flex items-center justify-center mb-6">
          <AlertCircle size={40} className="text-[#6C757D]" />
        </div>
        <h2 className="text-2xl font-bold mb-2">No Profile Found</h2>
        <p className="text-[#6C757D] mb-8 max-w-md">
          You need to build your profile first before we can generate a resume for you.
        </p>
        <a href="/profile" className="px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-[#333] transition-all">
          Go to Profile Builder
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Resume Generator</h1>
          <p className="text-[#6C757D]">AI is ready to craft your perfect resume.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="px-6 py-3 bg-black text-white rounded-xl font-semibold flex items-center gap-2 hover:bg-[#333] transition-all disabled:opacity-50 shadow-lg shadow-black/5"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
            {resume ? "Regenerate Resume" : "Generate Resume"}
          </button>
          {resume && (
            <button
              onClick={downloadPDF}
              className="px-6 py-3 bg-white border border-[#E9ECEF] rounded-xl font-semibold flex items-center gap-2 hover:bg-[#F8F9FA] transition-all"
            >
              <Download size={20} />
              Download PDF
            </button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Side: Inputs & ATS */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E9ECEF] shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <FileText size={18} /> Profile Overview
            </h3>
            <div className="space-y-4 text-sm">
              <div>
                <span className="text-[#6C757D] block mb-1">Target Role</span>
                <span className="font-medium">{profile.targetRole}</span>
              </div>
              <div>
                <span className="text-[#6C757D] block mb-1">Top Skills</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {profile.skills.split(",").map((s, i) => (
                    <span key={i} className="px-2 py-1 bg-[#F1F3F5] rounded-md text-xs">
                      {s.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {atsScore && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-6 rounded-2xl border border-[#E9ECEF] shadow-sm"
              >
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Target size={18} /> ATS Score
                </h3>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="#E9ECEF"
                        strokeWidth="8"
                        fill="transparent"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="#10B981"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={226}
                        strokeDashoffset={226 - (226 * atsScore.score) / 100}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <span className="absolute text-xl font-bold">{atsScore.score}%</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-emerald-600">Great Score!</p>
                    <p className="text-xs text-[#6C757D]">Your resume is highly optimized for ATS.</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <p className="text-xs font-bold text-[#495057] uppercase tracking-wider">Suggestions</p>
                  {atsScore.suggestions.map((s, i) => (
                    <div key={i} className="flex gap-2 text-sm text-[#495057]">
                      <ChevronRight size={14} className="mt-1 flex-shrink-0 text-emerald-500" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Resume Preview */}
        <div className="lg:col-span-8">
          <div className="bg-[#DEE2E6] p-4 md:p-8 rounded-2xl min-h-[800px] flex justify-center">
            {loading ? (
              <div className="flex flex-col items-center justify-center gap-4 text-[#495057]">
                <Loader2 className="animate-spin" size={40} />
                <p className="font-medium">AI is crafting your resume...</p>
              </div>
            ) : resume ? (
              <motion.div
                ref={resumeRef}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white w-full max-w-[800px] shadow-2xl p-12 flex flex-col gap-8 text-[#1A1A1A]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {/* Resume Header */}
                <div className="border-b-2 border-black pb-6">
                  <h2 className="text-4xl font-bold mb-2 uppercase tracking-tight">{profile.name}</h2>
                  <div className="flex flex-wrap gap-4 text-sm text-[#495057]">
                    <span>{profile.email}</span>
                    <span>•</span>
                    <span>{profile.targetRole}</span>
                  </div>
                </div>

                {/* Summary */}
                <section>
                  <h3 className="text-lg font-bold uppercase tracking-wider mb-3 border-b border-[#E9ECEF] pb-1">Professional Summary</h3>
                  <p className="text-sm leading-relaxed text-[#495057]">{resume.summary}</p>
                </section>

                {/* Experience */}
                <section>
                  <h3 className="text-lg font-bold uppercase tracking-wider mb-4 border-b border-[#E9ECEF] pb-1">Experience</h3>
                  <div className="flex flex-col gap-6">
                    {resume.experience.map((exp, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold">{exp.role}</h4>
                          <span className="text-sm text-[#6C757D]">{exp.period}</span>
                        </div>
                        <p className="text-sm font-medium text-[#495057] mb-2">{exp.company}</p>
                        <ul className="list-disc list-outside ml-4 space-y-1">
                          {exp.achievements.map((ach, j) => (
                            <li key={j} className="text-sm text-[#495057]">{ach}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Skills */}
                <section>
                  <h3 className="text-lg font-bold uppercase tracking-wider mb-3 border-b border-[#E9ECEF] pb-1">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {resume.skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-[#F8F9FA] border border-[#E9ECEF] rounded-md text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>

                {/* Projects */}
                <section>
                  <h3 className="text-lg font-bold uppercase tracking-wider mb-4 border-b border-[#E9ECEF] pb-1">Projects</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {resume.projects.map((proj, i) => (
                      <div key={i}>
                        <h4 className="font-bold mb-1">{proj.name}</h4>
                        <p className="text-sm text-[#495057] mb-2">{proj.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {proj.tech.map((t, j) => (
                            <span key={j} className="text-[10px] uppercase font-bold text-[#6C757D]">
                              {t}{j < proj.tech.length - 1 ? " • " : ""}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Education */}
                <section>
                  <h3 className="text-lg font-bold uppercase tracking-wider mb-3 border-b border-[#E9ECEF] pb-1">Education</h3>
                  <div className="flex flex-col gap-4">
                    {resume.education.map((edu, i) => (
                      <div key={i} className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold">{edu.school}</h4>
                          <p className="text-sm text-[#495057]">{edu.degree}</p>
                        </div>
                        <span className="text-sm text-[#6C757D]">{edu.year}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center text-[#6C757D] gap-4">
                <div className="p-8 bg-white/50 rounded-full border-2 border-dashed border-[#ADB5BD]">
                  <FileText size={60} className="opacity-20" />
                </div>
                <p className="text-center max-w-xs">
                  Click "Generate Resume" to see your professional AI-crafted resume here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
