// ============================================================
// 🔹Main — Entry point of the application
// ============================================================
import "dotenv/config";
import ai from "./config/gemini.config.js";

async function generateSkeleton(question: string) {
  const prompt = `
    Generate a skeleton outline for the following request:
    Return 2-3 bullet points that cover the main aspects of the request.
    Request: ${question}
    `;

  const response = await ai.invoke(prompt);

  return response.text;
}

async function expandPoint(point: string) {
  const prompt = `
    Expand the following point into a detailed, well-written section.
    ${point}
    `;

  const response = await ai.invoke(prompt);

  return response.text;
}

async function skeletonOfThought(question: string) {
  const skeletonText = await generateSkeleton(question);

  console.log("Skeleton Outline:" + skeletonText);

  const points = skeletonText
    .split("\n")
    .map((line) => line.replace(/^\d+\.|-/, "").trim())
    .filter(Boolean);

  console.log("Skeleton:", points);

  const expensions = await Promise.all(
    points.map((point) => expandPoint(point))
  );

  console.log("Expensions: " + expensions);

  let final = "";
  for (let i = 0; i < points.length; i++) {
    final += `## ${points[i]}\n\n${expensions[i]}\n\n`;
  }
  console.log("Final: " + final);
  return final;
}

(async () => {
  const answer = await skeletonOfThought("Explain how blockchain works.");
  console.log("Final Answer:\n" + answer);
})();
