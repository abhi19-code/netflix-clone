import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function getMovieRecommendation(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-flash-latest",
    contents: `
You are a movie recommendation assistant.

The user will describe their mood.

Return ONLY ONE movie title.

Rules:
- Return only the title.
- No year.
- No explanation.
- No markdown.
- No numbering.
- No quotation marks.

User mood:
${prompt}
`,
  });

  return response.text.trim();
}