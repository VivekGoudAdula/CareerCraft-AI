import axios from "axios";
import { UserProfile, ResumeData, ATSScore } from "../types";

const api = axios.create({
  baseURL: "/api",
});

export const saveProfile = (profile: UserProfile) => api.post("/profile", profile);

export const saveGeneratedResume = (userId: string, resumeData: ResumeData) => 
  api.post("/save-resume", { userId, resumeData });

export const generateResumeFromBackend = (userId: string) => 
  api.post("/generate-resume", null, { params: { user_id: userId } });

export const getResume = (userId: string) => api.get<ResumeData>(`/resume/${userId}`);

export const getATSScore = (userId: string) => api.get<ATSScore>(`/ats-score/${userId}`);

export const getPortfolio = (userId: string) => api.get(`/portfolio/${userId}`);

export default api;
