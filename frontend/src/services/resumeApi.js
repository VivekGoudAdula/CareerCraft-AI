import axios from 'axios';

const API_URL = 'http://localhost:8000';

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
  
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'resume.pdf');
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const getAtsScore = async (userId) => {
  const response = await axios.get(`${API_URL}/ats-score/${userId}`);
  return response.data;
};
