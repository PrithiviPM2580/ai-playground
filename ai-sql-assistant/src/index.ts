// ============================================================
// 🔹Main — Entry point of the application
// ============================================================
import "dotenv/config";
import express, { type Express } from "express";
import {
  extractDynamic,
  generateDataWithQuery,
  generateWithMemory,
} from "./utils/index.js";

const app: Express = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI SQL Assistant is running!");
});

app.post("/prompt", async (req, res) => {
  const { prompt } = req.body as { prompt: string };

  try {
    const sqlQuery = await generateWithMemory(prompt);
    console.log(sqlQuery);

    const result = await generateDataWithQuery(sqlQuery);

    const safeResult = JSON.parse(
      JSON.stringify(result, (_, value) =>
        typeof value === "bigint" ? Number(value) : value
      )
    );

    const { keys, rows } = extractDynamic(safeResult);

    const summary = await generateWithMemory(`
    SQL Result Rows:
    ${JSON.stringify(rows, null, 2)}
    
    Please summarise this result in natural language.
`);

    res.json({
      sql: sqlQuery,
      result: safeResult,
      aiResponse: summary,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send("Internal Server Error");
  }
});
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
