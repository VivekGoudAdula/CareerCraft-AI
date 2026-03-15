<div align="center">

# 🚀 CareerCraft AI
### Your AI-Powered Professional Launchpad

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/Frontend-React%2018-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Groq](https://img.shields.io/badge/AI-Groq%20LLaMA-f59e0b?style=flat-square&logo=brain&logoColor=white)](https://groq.com/)
[![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[![Live Demo Link] (career-craft-ai-rp.vercel.app)]

---

**CareerCraft AI** is a cutting-edge platform designed to revolutionize the job application process. Using advanced LLMs, it transforms raw career data into professional, ATS-optimized resumes and high-end personal portfolio websites instantly.

</div>

## ✨ Key Features

### 📄 AI Resume Architect
- **ATS Optimization**: Generates resumes designed to beat modern recruitment software.
- **AI Narrative Styling**: Transforms basic bullet points into high-impact professional achievement statements.
- **Smart Scoring**: Real-time ATS scoring with specific suggestions for improvement.
- **PDF Export**: Generate ready-to-use professional PDF resumes in one click.

### 🌐 Portfolio Studio
- **Instant Generation**: Converts your profile into a live-hosted website in seconds.
- **Premium Templates**:
  - **Cyber-Dev**: Futuristic dark-mode for software engineers.
  - **Elite Editorial**: High-end minimal serif design for creative professionals.
  - **Studio Matrix**: Immersive, full-screen interactive experience.
- **Live Sync**: Changes to your onboarding profile reflect across all templates automatically.

### 🧠 Intelligent Onboarding
- **Zero Friction**: Guided multi-step onboarding to capture your career story.
- **Skill Mapping**: Automatic categorization of technical and soft skills.

---

## 🛠️ Tech Stack

### Frontend (React Ecosystem)
- **Vite**: Ultra-fast build tool for modern web development.
- **TailwindCSS**: Premium utility-first styling with custom glassmorphism effects.
- **Framer Motion**: High-performance animations and transitions.
- **Lucide React**: Beautifully crafted vector icons.

### Backend (Python Ecosystem)
- **FastAPI**: High-performance asynchronous API framework.
- **SQLAlchemy**: Robust ORM for database management.
- **SQLite**: Reliable, file-based database storage.
- **Groq AI**: LLaMA-powered intelligence for resume generation and ATS analysis.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Python (3.9+)
- Groq API Key (for Resume Generation)

### 🖥️ Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

### ⚙️ Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: .\venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Create a `.env` file and add your `GROQ_API_KEY`:
   ```env
   GROQ_API_KEY=your_key_here
   ```
5. Run the API server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

---

## 📂 Project Structure

```text
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI components & Portfolio Templates
│   │   ├── pages/         # Feature pages (Dashboard, Portfolio, Resume)
│   │   ├── services/      # API integration layers
│   │   └── App.jsx        # Routing and core logic
├── backend/
│   ├── routers/           # Feature-specific API endpoints
│   ├── services/          # Business logic & AI Integration
│   ├── models.py          # SQLAlchemy database schemas
│   └── main.py            # FastAPI entry point
└── README.md
```

---

<div align="center">
Built with ❤️ By Vivek Goud Adula - for the Ignition Era Hackathon
</div>
