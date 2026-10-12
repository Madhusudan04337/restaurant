import express from "express";
import { GoogleGenAI } from "@google/genai";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  app.use(express.json());

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // Gemini AI Food Recommendation endpoint
  app.post("/api/gemini/recommendations", async (req, res) => {
    try {
      const { query, preferences, restaurants } = req.body;
      const prompt = `You are Chef AI, the culinary concierge for CraveDrop (a premier food delivery and dining service). 
      User query: "${query || 'Recommend something amazing'}".
      User preferences: ${JSON.stringify(preferences || {})}.
      Available restaurants and menus summary: ${JSON.stringify(restaurants || [])}.
      
      Provide a helpful, appetizing, and concise food/restaurant recommendation response in JSON format with:
      - "message": A warm, engaging response recommending specific dishes and restaurants.
      - "recommendedRestaurantIds": Array of restaurant IDs (strings) that match the recommendation.
      - "highlightDish": Name of a standout dish to try.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          systemInstruction: "You are an expert culinary guide for CraveDrop. Always return valid JSON matching the requested structure.",
        }
      });

      const text = response.text || "{}";
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        data = { message: text, recommendedRestaurantIds: [], highlightDish: "" };
      }
      res.json(data);
    } catch (error: any) {
      console.error("Gemini AI error:", error);
      res.status(500).json({ error: error.message || "Failed to get AI recommendations" });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, "0.0.0.0", () => {
    console.log(`CraveDrop server running on http://localhost:${port}`);
  });
}

startServer();
