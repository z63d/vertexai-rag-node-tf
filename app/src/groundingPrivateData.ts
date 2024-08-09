import {
	type GenerateContentResponse,
	HarmBlockThreshold,
	HarmCategory,
	VertexAI,
} from "@google-cloud/vertexai";

export async function generateContentWithVertexAISearchGrounding(
	projectId: string,
	location: string,
	model: string,
	dataStoreId: string,
	text: string,
): Promise<{ answer: string }> {
	const vertexAI = new VertexAI({ project: projectId, location: location });

	const generativeModelPreview = vertexAI.preview.getGenerativeModel({
		model: model,
		safetySettings: [
			{
				category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
				threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
			},
		],
		generationConfig: { maxOutputTokens: 256 },
	});

	const vertexAIRetrievalTool = {
		retrieval: {
			vertexAiSearch: {
				datastore: `projects/${projectId}/locations/global/collections/default_collection/dataStores/${dataStoreId}`,
			},
			disableAttribution: false,
		},
	};

	const request = {
		contents: [{ role: "user", parts: [{ text: text }] }],
		tools: [vertexAIRetrievalTool],
	};

	const result = await generativeModelPreview.generateContent(request);
	const response: GenerateContentResponse = result.response;
	const groundingMetadata = response.candidates?.[0];

	console.log("GroundingMetadata is: ", JSON.stringify(groundingMetadata));

	return {
		answer: response.candidates?.[0].content.parts[0].text || "",
	};
}
