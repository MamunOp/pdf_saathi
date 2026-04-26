import { GoogleGenAI } from "@google/genai";

let genAI: GoogleGenAI | null = null;

function getAI() {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured.');
    }
    genAI = new GoogleGenAI({ apiKey });
  }
  return genAI;
}

export async function summarizePDF(text: string) {
  const ai = getAI();
  const model = "gemini-3-flash-preview";
  const prompt = `Summarize the following PDF text content efficiently. Highlight the key points, main conclusions, and any actionable items. 
  
  Format the output nicely using Markdown.
  
  TEXT:
  ${text.slice(0, 30000)} // Limiting to stay within token context safely
  `;

  const response = await ai.models.generateContent({
    model,
    contents: [{ parts: [{ text: prompt }] }],
  });

  return response.text;
}

export async function chatWithPDF(text: string, question: string, history: any[] = []) {
  const ai = getAI();
  const model = "gemini-3-flash-preview";
  
  const systemInstruction = `You are a helpful assistant that answers questions based on the provided PDF content. 
  If the answer is not in the text, say so politely. Be precise and concise.
  
  PDF CONTENT:
  ${text.slice(0, 20000)}
  `;

  const response = await ai.models.generateContent({
    model,
    contents: [
      ...history,
      { parts: [{ text: question }] }
    ],
    config: {
      systemInstruction
    }
  });

  return response.text;
}
