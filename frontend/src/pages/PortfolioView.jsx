import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import api from '../services/api';
import Template1 from '../components/portfolio/Template1';
import Template2 from '../components/portfolio/Template2';
import Template3 from '../components/portfolio/Template3';

const PortfolioView = () => {
  const { userId } = useParams();
  const [searchParams] = useSearchParams();
  const templateId = parseInt(searchParams.get('t')) || 1;
  
  const [loading, setLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/portfolio/${userId}`);
        setPortfolioData(res.data);
      } catch (err) {
        console.error("Error fetching portfolio:", err);
        setError("Portfolio not found or profile incomplete.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-medium">Loading Portfolio...</p>
      </div>
    );
  }

  if (error || !portfolioData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
        <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tighter">404 - Portfolio Not Found</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          The requested portfolio doesn't exist or the user hasn't completed their profile yet.
        </p>
        <a href="/" className="mt-8 bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold">
          Go Home
        </a>
      </div>
    );
  }

  const renderTemplate = () => {
    switch (templateId) {
      case 1: return <Template1 data={portfolioData} />;
      case 2: return <Template2 data={portfolioData} />;
      case 3: return <Template3 data={portfolioData} />;
      default: return <Template1 data={portfolioData} />;
    }
  };

  return (
    <div className="portfolio-view">
      {renderTemplate()}
    </div>
  );
};

export default PortfolioView;
