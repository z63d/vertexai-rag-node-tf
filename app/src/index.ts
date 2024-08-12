import dotenv from "dotenv";
import express, { type Express } from "express";
import { generateContentWithVertexAISearchGrounding } from "./groundingPrivateData";
import { generateContentWithGoogleSearchGrounding } from "./groundingPublicData";

const app: Express = express();

dotenv.config();

const PORT: number = Number.parseInt(process.env.PORT || "3000");
const projectId = process.env.PROJECT_ID || "";
const location = process.env.LOCATION || "asia-northeast1";
const model = process.env.MODEL || "gemini-1.5-flash-001";
const dataStoreId = process.env.DATASTORE_ID || "vertexai-rag-node-tf";

app.use(express.json());

app.post("/google-search-grounding", async (req, res) => {
  const r = await generateContentWithGoogleSearchGrounding(
    projectId,
    location,
    model,
    req.body.text,
  ).catch((err) => {
    console.error(err.message);
    process.exitCode = 1;
  });

  res.status(200).json({
    answer: r?.answer,
  });
});

app.post("/vertex-ai-search-grounding", async (req, res) => {
  const r = await generateContentWithVertexAISearchGrounding(
    projectId,
    location,
    model,
    dataStoreId,
    req.body.text,
  ).catch((err) => {
    console.error(err.message);
    process.exitCode = 1;
  });

  res.status(200).json({
    answer: r?.answer,
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});
