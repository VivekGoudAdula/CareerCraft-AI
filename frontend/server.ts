import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory store for demo purposes
  const store: any = {
    profiles: {},
    resumes: {},
    atsScores: {}
  };

  // API Routes
  app.post("/api/profile", (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });
    store.profiles[email] = req.body;
    res.json({ message: "Profile saved", userId: email });
  });

  app.post("/api/generate-resume", (req, res) => {
    const { userId, resumeData } = req.body;
    if (!userId) return res.status(400).json({ error: "User ID is required" });
    
    // In a real app, the backend might call AI, 
    // but here we follow the frontend-AI rule.
    // The frontend sends the generated resume to be stored.
    store.resumes[userId] = resumeData;
    
    // Mock ATS Score generation
    const score = Math.floor(Math.random() * (95 - 75 + 1)) + 75;
    store.atsScores[userId] = {
      score,
      suggestions: [
        "Include more quantifiable achievements in your work experience.",
        "Add more industry-specific keywords to your skills section.",
        "Ensure your contact information is clearly visible at the top.",
        "Use a cleaner, more professional font for better readability."
      ]
    };

    res.json({ message: "Resume generated and stored", userId });
  });

  app.get("/api/resume/:user_id", (req, res) => {
    const userId = req.params.user_id;
    const resume = store.resumes[userId];
    if (!resume) return res.status(404).json({ error: "Resume not found" });
    res.json(resume);
  });

  app.get("/api/ats-score/:user_id", (req, res) => {
    const userId = req.params.user_id;
    const scoreData = store.atsScores[userId];
    if (!scoreData) return res.status(404).json({ error: "ATS score not found" });
    res.json(scoreData);
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
