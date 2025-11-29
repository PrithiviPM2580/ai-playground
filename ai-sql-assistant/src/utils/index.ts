// ============================================================
// 🔹UtilsFunctions — Utility functions for various tasks
// ============================================================

import ai from "src/config/gemini.config.js";
import prisma from "src/config/prisma.config.js";

// ------------------------------------------------------
// systemPrompt() — Generates the system prompt for the AI model
// ------------------------------------------------------
export function systemPrompt() {
  return `
  You are an AI that converts natural language into MySQL queries.
  
  RULES:
  - Return ONLY the SQL query.
  - Do NOT provide explanations.
  - Do NOT return code blocks (no \`\`\` or markdown).
  - Return plain SQL only.
  - Use correct table names exactly as defined.
  
  DATABASE SCHEMA:
  
  TABLE: Student
  - id INT
  - name VARCHAR
  - age INT
  - batch_id INT
  - fees_status ENUM('PAID', 'UNPAID')
  
  TABLE: Batch
  - id INT
  - batch_name VARCHAR
  - subject VARCHAR
  
  TABLE: Fee
  - id INT
  - amount FLOAT
  - payment_date DATETIME
  - mode ENUM('CASH','CARD','ONLINE')
  - student_id INT
  
  OUTPUT FORMAT:
  - Always respond with raw SQL only.
  - Example: SELECT * FROM Student;
`;
}

// ------------------------------------------------------
// generateContentAI() — Generates AI content based on the prompt
// ------------------------------------------------------
export async function generateContentAI(prompt: string): Promise<string> {
  // Call the AI model to generate content
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
    config: {
      systemInstruction: systemPrompt(),
    },
  });

  return response.text as string;
}

// ------------------------------------------------------
// generateDataWithQuery() — Generates data based on the SQL query
// ------------------------------------------------------
export async function generateDataWithQuery(sqlQuery: string) {
  // Execute the raw SQL query using Prisma
  return prisma.$queryRawUnsafe(sqlQuery);
}

export function extractDynamic<T extends Record<string, any>>(result: T[]) {
  if (!Array.isArray(result) || result.length === 0) {
    throw new Error("Result is empty");
  }

  const keys = Object.keys(result[0]) as (keyof T)[];

  return {
    keys,
    rows: result,
  };
}

// Very simple in-memory memory
let conversationMemory: { role: "user" | "model"; content: string }[] = [];
export async function generateWithMemory(newPrompt: string) {
  // Build final prompt using memory + new message
  const context = conversationMemory
    .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
    .join("\n");

  const finalPrompt = `
${context}

USER: ${newPrompt}

Based on the conversation above, respond appropriately.
  `;

  const response = await generateContentAI(finalPrompt);

  // Save both user prompt and AI response inside memory
  conversationMemory.push({ role: "user", content: newPrompt });
  conversationMemory.push({ role: "model", content: response });

  return response;
}
