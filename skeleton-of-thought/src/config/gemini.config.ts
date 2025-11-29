// ============================================================
// 🔹GeminiConfig — Gemini configuration
// ============================================================
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// ------------------------------------------------------
// Gemini Configuration
// ------------------------------------------------------
const ai = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash", // Specify the Gemini model
  apiKey: process.env.GEMINI_API_KEY, // Your Google API key
  temperature: 0.7, // Adjust the temperature for response creativity
});

export default ai;
