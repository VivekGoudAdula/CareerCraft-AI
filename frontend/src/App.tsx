import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import ProfileBuilder from "./pages/ProfileBuilder";
import ResumeGenerator from "./pages/ResumeGenerator";
import PortfolioPreview from "./pages/PortfolioPreview";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/profile" element={<ProfileBuilder />} />
          <Route path="/resume" element={<ResumeGenerator />} />
          <Route path="/portfolio" element={<PortfolioPreview />} />
        </Routes>
      </Layout>
    </Router>
  );
}
