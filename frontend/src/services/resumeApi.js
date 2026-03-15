import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const generateResume = async (userId) => {
  const response = await axios.post(`${API_URL}/generate-resume`, { user_id: userId });
  return response.data;
};

export const getResume = async (userId) => {
  const response = await axios.get(`${API_URL}/resume/${userId}`);
  return response.data;
};

export const downloadResume = async (userId) => {
  const response = await axios.get(`${API_URL}/export-resume/${userId}`, {
    responseType: 'blob',
  });
  
  const blob = new Blob([response.data], { type: 'application/pdf' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `resume_${userId}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

export const getAtsScore = async (userId) => {
  const response = await axios.get(`${API_URL}/ats-score/${userId}`);
  return response.data;
};
