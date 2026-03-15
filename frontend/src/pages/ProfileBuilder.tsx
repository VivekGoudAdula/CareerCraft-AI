import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { User, Mail, GraduationCap, Code, Briefcase, FolderGit2, Target, Save, Loader2 } from "lucide-react";
import { saveProfile } from "../services/api";
import { UserProfile } from "../types";

export default function ProfileBuilder() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    education: "",
    skills: "",
    workExperience: "",
    projects: "",
    targetRole: ""
  });

  // Load from local storage if exists
  useEffect(() => {
    const saved = localStorage.getItem("career_craft_profile");
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved profile", e);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await saveProfile(profile);
      localStorage.setItem("career_craft_profile", JSON.stringify(profile));
      navigate("/resume");
    } catch (error) {
      console.error("Failed to save profile", error);
      alert("Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "w-full px-4 py-3 rounded-xl border border-[#E9ECEF] focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all bg-[#F8F9FA]";
  const labelClasses = "flex items-center gap-2 text-sm font-semibold mb-2 text-[#495057]";

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Build Your Profile</h1>
        <p className="text-[#6C757D]">Enter your details below to generate your AI-powered resume.</p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl border border-[#E9ECEF] shadow-sm flex flex-col gap-8"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className={labelClasses}>
              <User size={16} /> Name
            </label>
            <input
              required
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>
              <Mail size={16} /> Email
            </label>
            <input
              required
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label className={labelClasses}>
            <Target size={16} /> Target Job Role
          </label>
          <input
            required
            type="text"
            name="targetRole"
            value={profile.targetRole}
            onChange={handleChange}
            placeholder="Senior Frontend Engineer"
            className={inputClasses}
          />
        </div>

        <div>
          <label className={labelClasses}>
            <GraduationCap size={16} /> Education
          </label>
          <textarea
            required
            name="education"
            value={profile.education}
            onChange={handleChange}
            placeholder="B.S. in Computer Science, University of Technology (2018-2022)"
            rows={2}
            className={inputClasses}
          />
        </div>

        <div>
          <label className={labelClasses}>
            <Code size={16} /> Skills (comma separated)
          </label>
          <input
            required
            type="text"
            name="skills"
            value={profile.skills}
            onChange={handleChange}
            placeholder="React, TypeScript, TailwindCSS, Node.js"
            className={inputClasses}
          />
        </div>

        <div>
          <label className={labelClasses}>
            <Briefcase size={16} /> Work Experience
          </label>
          <textarea
            required
            name="workExperience"
            value={profile.workExperience}
            onChange={handleChange}
            placeholder="Software Engineer at TechCorp (2022-Present): Developed scalable web apps..."
            rows={4}
            className={inputClasses}
          />
        </div>

        <div>
          <label className={labelClasses}>
            <FolderGit2 size={16} /> Projects
          </label>
          <textarea
            required
            name="projects"
            value={profile.projects}
            onChange={handleChange}
            placeholder="E-commerce Platform: Built with Next.js and Stripe..."
            rows={3}
            className={inputClasses}
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-[#333] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-lg shadow-black/5"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Saving Profile...
            </>
          ) : (
            <>
              <Save size={20} />
              Save Profile
            </>
          )}
        </button>
      </motion.form>
    </div>
  );
}
