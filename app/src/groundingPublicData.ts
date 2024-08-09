import { VertexAI } from "@google-cloud/vertexai";

export async function generateContentWithGoogleSearchGrounding(
  projectId: string,
  location: string,
  model: string,
  text: string,
): Promise<{ answer: string }> {
  const vertexAI = new VertexAI({ project: projectId, location: location });

  const generativeModelPreview = vertexAI.preview.getGenerativeModel({
    model: model,
    generationConfig: { maxOutputTokens: 256 },
  });

  const googleSearchRetrievalTool = {
    googleSearchRetrieval: {},
  };

  const request = {
    contents: [{ role: "user", parts: [{ text: text }] }],
    tools: [googleSearchRetrievalTool],
  };

  const result = await generativeModelPreview.generateContent(request);
  const response = await result.response;
  const groundingMetadata = response.candidates?.[0].groundingMetadata;

  console.log("GroundingMetadata is: ", JSON.stringify(groundingMetadata));

  return {
    answer: response.candidates?.[0].content.parts[0].text || "",
  };
}
