// ============================================================
// 🔹Main — Entry point of the application
// ============================================================
import "dotenv/config";
import express, { type Express } from "express";

const app: Express = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI SQL Assistant is running!");
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
