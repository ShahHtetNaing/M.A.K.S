
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { LughatWord } from "../types";

const SYSTEM_INSTRUCTION_BASE = "You are an AI Tutor for M.A.K.S (Modern Arabic & Quran Study). Provide clear, helpful, and academically sound explanations of Arabic grammar and Quranic linguistics in English.";

/**
 * Checks if the API key is present without crashing.
 */
export const isAiAvailable = (): boolean => {
  const apiKey = process.env.API_KEY;
  return !!(apiKey && apiKey !== "undefined" && apiKey.length > 10);
};

/**
 * Lazy-load the AI instance only when a request is made.
 * Initialization follows the guideline: new GoogleGenAI({ apiKey: process.env.API_KEY })
 */
const getAi = () => {
  if (!process.env.API_KEY || process.env.API_KEY === "undefined") {
    throw new Error("MISSING_KEY");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const openInGoogleTranslate = (text: string) => {
  const url = `https://translate.google.com/?sl=ar&tl=en&text=${encodeURIComponent(text)}&op=translate`;
  window.open(url, '_blank');
};

// Added getPronunciationFeedback to resolve the import error in Courses.tsx
/**
 * Provides feedback on Arabic pronunciation attempts.
 */
export const getPronunciationFeedback = async (audioAttempt: string, lessonTitle: string): Promise<string> => {
  try {
    if (!isAiAvailable()) return "Pronunciation feedback is currently disabled in offline mode.";
    
    const ai = getAi();
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide feedback on the pronunciation attempt for lesson: "${lessonTitle}". 
      Student attempt description: "${audioAttempt}". 
      Focus on Tajweed rules and correct Arabic phonetics.`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_BASE,
      },
    });

    return response.text || "No feedback available.";
  } catch (error: any) {
    console.warn("Pronunciation feedback failed:", error.message);
    return "Feedback temporarily unavailable.";
  }
};

export const getLughatAnalysis = async (word: string, verseContext: string): Promise<LughatWord> => {
  try {
    if (!isAiAvailable()) throw new Error("MISSING_KEY");
    
    const ai = getAi();
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the Arabic word "${word}" in context: "${verseContext}". 
      Return JSON: { "meaning": "", "root": "", "usage": "", "globalCount": 0, "synonyms": [""], "occurrences": ["2:1"], "grammarAnalysis": "" }`,
      config: {
        responseMimeType: 'application/json',
        systemInstruction: 'You are a master of Quranic philology. Responses must be valid JSON.',
      },
    });

    return JSON.parse(response.text || '{}');
  } catch (error: any) {
    console.warn("AI Analysis skipped:", error.message);
    // Return a graceful fallback object if AI fails or key is missing
    return {
      word,
      meaning: "Lughat analysis requires an API key.",
      root: "N/A",
      usage: "Please configure API_KEY in environment variables.",
      globalCount: 0,
      synonyms: [],
      occurrences: [],
      grammarAnalysis: "The AI service is currently unavailable."
    };
  }
};

export const getVerseDeepAnalysis = async (verseText: string, translation: string): Promise<string> => {
  try {
    if (!isAiAvailable()) return "AI analysis is currently disabled. Please contact the administrator to provide a Google Gemini API Key in the Netlify settings.";
    
    const ai = getAi();
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Deep analysis for: "${verseText}" (${translation}). Include Tafsir and Tajweed tips.`,
      config: { systemInstruction: SYSTEM_INSTRUCTION_BASE }
    });
    return response.text || "No analysis available.";
  } catch (error: any) {
    return "The AI analysis feature is currently unavailable. The rest of the Quran text remains accessible.";
  }
};

export const askGemini = async (prompt: string, context?: string): Promise<string> => {
  try {
    if (!isAiAvailable()) return "I am currently in 'Offline Mode'. To enable my AI capabilities, an API key must be added to the project settings.";
    
    const ai = getAi();
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: context ? `Context: ${context}\n\nQuestion: ${prompt}` : prompt,
      config: { systemInstruction: SYSTEM_INSTRUCTION_BASE }
    });
    return response.text || "I'm sorry, I couldn't process that.";
  } catch (error) {
    return "I am having trouble connecting to my AI core right now. Please try again later.";
  }
};
