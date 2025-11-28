// ============================================================
// 🔹GeminiConfig — Configuration for Gemini Model
// ============================================================
import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

// Initialize Google Gemini AI with API key from environment variables
const ai= new GoogleGenAI({
  apiKey:process.env.GOOGLE_API_KEY,  
});

export default ai;