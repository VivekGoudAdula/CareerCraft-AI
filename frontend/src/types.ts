export interface UserProfile {
  name: string;
  email: string;
  education: string;
  skills: string;
  workExperience: string;
  projects: string;
  targetRole: string;
}

export interface ResumeData {
  summary: string;
  experience: {
    company: string;
    role: string;
    period: string;
    achievements: string[];
  }[];
  education: {
    school: string;
    degree: string;
    year: string;
  }[];
  skills: string[];
  projects: {
    name: string;
    description: string;
    tech: string[];
  }[];
}

export interface ATSScore {
  score: number;
  suggestions: string[];
}
