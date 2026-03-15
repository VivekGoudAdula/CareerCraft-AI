import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, PartyPopper, ArrowRight, Loader2 } from 'lucide-react';
import ProgressBar from '../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';
import api from '../services/api';

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    mobile: "",
    linkedin: "",
    github: "",
    education_school: null,
    education_intermediate: null,
    education_btech: null,
    skills: "",
    experience: [],
    projects: [],
    achievements: [],
    hobbies: ""
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    if (!token) {
      navigate('/login');
      return;
    }

    // Check if profile exists to skip onboarding
    const checkProfile = async () => {
      try {
        const response = await api.get(`/profile/${userId}`);
        if (response.data) {
          navigate('/dashboard');
        }
      } catch (err) {
        // Profile doesn't exist, stay on onboarding
        console.log("No profile found, proceeding with onboarding");
      }
    };

    if (userId) checkProfile();
  }, [navigate]);

  const steps = [
    { key: 'name', question: "What's your full name?", placeholder: "John Doe" },
    { key: 'email', question: "What is your email address?", placeholder: "john@example.com", type: "email" },
    { key: 'mobile', question: "What is your mobile number?", placeholder: "+91 98765 43210", type: "tel" },
    { key: 'linkedin', question: "Paste your LinkedIn profile URL", placeholder: "linkedin.com/in/username" },
    { key: 'github', question: "Paste your GitHub profile URL", placeholder: "github.com/username" },
    { 
      key: 'education_school', 
      question: "Tell us about your Schooling", 
      isList: true, 
      options: { singleEntry: true },
      listFields: [
        { name: 'name', label: 'School Name' },
        { name: 'board', label: 'Board (CBSE/ICSE/State)' },
        { name: 'year', label: 'Passing Year' }
      ]
    },
    { 
      key: 'education_intermediate', 
      question: "Intermediate / Diploma details", 
      isList: true, 
      options: { singleEntry: true },
      listFields: [
        { name: 'name', label: 'College Name' },
        { name: 'board', label: 'Board' },
        { name: 'year', label: 'Passing Year' }
      ]
    },
    { 
      key: 'education_btech', 
      question: "B.Tech / Graduation details", 
      isList: true, 
      options: { singleEntry: true },
      listFields: [
        { name: 'name', label: 'College Name' },
        { name: 'branch', label: 'Branch / Stream' },
        { name: 'year', label: 'Year of Graduation' }
      ]
    },
    { 
      key: 'skills', 
      question: "What are your core skills?", 
      placeholder: "React, Python, AWS... (Enter to add)",
      isTags: true 
    },
    { 
      key: 'experience', 
      question: "Any Work or Internship experiences?", 
      isList: true,
      listFields: [
        { name: 'company', label: 'Company Name' },
        { name: 'role', label: 'Your Role' },
        { name: 'duration', label: 'Duration (e.g. 6 Months)' }
      ]
    },
    { 
      key: 'projects', 
      question: "Showcase your Projects", 
      isList: true,
      listFields: [
        { name: 'title', label: 'Project Title' },
        { name: 'tech', label: 'Tech Stack' },
        { name: 'description', label: 'Short Description' },
        { name: 'link', label: 'GitHub Link' }
      ]
    },
    { 
      key: 'achievements', 
      question: "Achievements or Certifications?", 
      isList: true,
      listFields: [
        { name: 'title', label: 'Achievement Title' },
        { name: 'provider', label: 'Issued by / Context' }
      ]
    },
    { 
      key: 'hobbies', 
      question: "What are your hobbies?", 
      placeholder: "Chess, Guitar, Hiking...",
      isTags: true 
    }
  ];

  const handleNext = (val) => {
    const step = steps[currentStep];
    
    // Store name in localStorage when entered
    if (step.key === 'name') {
      localStorage.setItem('userName', val);
    }

    if (step.isTags && typeof val === 'string') {
      const tags = val.split(',').map(s => s.trim()).filter(s => s);
      setProfile(prev => ({ ...prev, [step.key]: tags }));
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleFinish();
    }
  };

  const updateProfile = (key, val) => {
    setProfile(prev => ({ ...prev, [key]: val }));
  };

  const handleFinish = async () => {
    setIsFinishing(true);
    try {
      const userId = localStorage.getItem('userId');
      const storedEmail = localStorage.getItem('userEmail') || profile.email;
      const storedName = localStorage.getItem('userName') || profile.name;

      await api.post('/profile', {
        user_id: userId,           // always send the real DB user id
        profile_data: {
          ...profile,
          email: storedEmail,      // ensure correct email is always sent
          name: storedName,
        }
      });
    } catch (err) {
      console.error("Profile update failed", err);
    } finally {
      // For demo, even if it fails we proceed to a "Ready" state
      setTimeout(() => setIsFinishing('done'), 1500);
    }
  };

  if (isFinishing === 'done') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg"
        >
          <div className="bg-indigo-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
            <PartyPopper className="w-12 h-12 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-outfit">Your profile is ready! 🎉</h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            We've gathered everything we need. Our AI is now ready to craft your perfect resume.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/dashboard')}
            className="w-full bg-indigo-600 text-white font-bold py-5 rounded-2xl shadow-2xl shadow-indigo-600/30 flex items-center justify-center gap-3 text-lg"
          >
            Generate My Resume <Sparkles className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <ProgressBar current={currentStep + 1} total={steps.length} />
      
      <div className="pt-40 pb-20 flex items-center justify-center min-h-[80vh]">
        <AnimatePresence mode="wait">
          <QuestionCard
            key={currentStep}
            question={steps[currentStep].question}
            value={profile[steps[currentStep].key]}
            onChange={(val) => updateProfile(steps[currentStep].key, val)}
            onNext={handleNext}
            type={steps[currentStep].type}
            placeholder={steps[currentStep].placeholder}
            isList={steps[currentStep].isList}
            listFields={steps[currentStep].listFields}
            options={steps[currentStep].options}
          />
        </AnimatePresence>
      </div>

      {isFinishing === true && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-white/80 backdrop-blur-md z-[100] flex flex-col items-center justify-center"
        >
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 font-outfit">Saving your profile...</h2>
        </motion.div>
      )}

      {/* Navigation cues */}
      <div className="fixed bottom-10 left-0 right-0 px-10 flex justify-between items-center text-gray-400 pointer-events-none">
        <div className="flex items-center gap-2">
          {currentStep > 0 && (
            <button 
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="pointer-events-auto bg-gray-50 hover:bg-gray-100 p-3 rounded-full transition-colors"
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
            </button>
          )}
        </div>
        <div className="text-xs font-bold uppercase tracking-widest hidden md:block opacity-50">
          Conversational Onboarding • {currentStep + 1} of {steps.length}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
