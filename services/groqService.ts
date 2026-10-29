import { LughatWord } from "../types";

const ENDPOINT = '/api/groq';

const SYSTEM_INSTRUCTION_BASE = "You are an AI Tutor for M.A.K.S (Modern Arabic & Quran Study). Provide clear, helpful, and academically sound explanations of Arabic grammar and Quranic linguistics in English. Write plain text with short paragraphs or simple bullet lists; do not use markdown headings or tables.";

type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string };

export class AiUnavailableError extends Error {
  constructor() {
    super('MISSING_KEY');
  }
}

let availability: Promise<boolean> | null = null;

/**
 * Asks the server whether a Groq key is configured. Cached for the session;
 * a network failure is not cached so the next call retries.
 */
export const checkAiAvailability = (): Promise<boolean> => {
  if (!availability) {
    availability = fetch(ENDPOINT, { method: 'GET' })
      .then(res => (res.ok ? res.json() : { configured: false }))
      .then(data => !!data?.configured)
      .catch(() => {
        availability = null;
        return false;
      });
  }
  return availability;
};

const chat = async (messages: ChatMessage[], options: { json?: boolean; maxTokens?: number } = {}): Promise<string> => {
  if (!(await checkAiAvailability())) throw new AiUnavailableError();

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, ...options }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (data?.error === 'MISSING_KEY') {
      availability = Promise.resolve(false);
      throw new AiUnavailableError();
    }
    throw new Error(data?.error || `HTTP ${res.status}`);
  }
  return String(data.content || '');
};

const parseJsonObject = (text: string): any => {
  const cleaned = text.replace(/^\s*```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '');
  try {
    return JSON.parse(cleaned);
  } catch {
    const match = cleaned.match(/\{[\s\S]*\}/);
    return match ? JSON.parse(match[0]) : {};
  }
};

const toStringArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.map(v => String(v).trim()).filter(Boolean) : [];

export const openInGoogleTranslate = (text: string) => {
  const url = `https://translate.google.com/?sl=ar&tl=en&text=${encodeURIComponent(text)}&op=translate`;
  window.open(url, '_blank');
};

/**
 * Provides feedback on Arabic pronunciation attempts.
 */
export const getPronunciationFeedback = async (audioAttempt: string, lessonTitle: string): Promise<string> => {
  try {
    return await chat([
      { role: 'system', content: SYSTEM_INSTRUCTION_BASE },
      {
        role: 'user',
        content: `Provide feedback on the pronunciation attempt for lesson: "${lessonTitle}".
Student attempt description: "${audioAttempt}".
Focus on Tajweed rules and correct Arabic phonetics.`,
      },
    ]) || "No feedback available.";
  } catch (error: any) {
    if (error instanceof AiUnavailableError) return "Pronunciation feedback is currently disabled in offline mode.";
    console.warn("Pronunciation feedback failed:", error.message);
    return "Feedback temporarily unavailable.";
  }
};

export const getLughatAnalysis = async (word: string, verseContext: string): Promise<LughatWord> => {
  try {
    const text = await chat(
      [
        { role: 'system', content: 'You are a master of Quranic philology. Respond with a single valid JSON object only.' },
        {
          role: 'user',
          content: `Analyze the Arabic word "${word}" in context: "${verseContext}".
Return JSON: { "meaning": "", "root": "", "usage": "", "globalCount": 0, "synonyms": [""], "occurrences": ["2:1"], "grammarAnalysis": "" }
"occurrences" are Quran references in "surah:ayah" form. "synonyms" are short English renderings.`,
        },
      ],
      { json: true, maxTokens: 1200 },
    );
    const data = parseJsonObject(text);
    return {
      word,
      meaning: String(data.meaning || 'Meaning unavailable.'),
      root: String(data.root || 'N/A'),
      usage: String(data.usage || ''),
      globalCount: Number(data.globalCount) || 0,
      synonyms: toStringArray(data.synonyms),
      occurrences: toStringArray(data.occurrences).filter(o => /^\d+:\d+$/.test(o)),
      grammarAnalysis: String(data.grammarAnalysis || ''),
    };
  } catch (error: any) {
    const offline = error instanceof AiUnavailableError;
    if (!offline) console.warn("AI Analysis skipped:", error.message);
    return {
      word,
      meaning: offline ? "AI word analysis is offline." : "Lughat analysis is temporarily unavailable.",
      root: "N/A",
      usage: offline ? "Add a GROQ_API_KEY to the site environment to enable AI analysis." : "Please try again in a moment.",
      globalCount: 0,
      synonyms: [],
      occurrences: [],
      grammarAnalysis: "The AI service is currently unavailable. You can still listen to the word and read the full Quran text.",
    };
  }
};

export const getVerseDeepAnalysis = async (verseText: string, translation: string): Promise<string> => {
  try {
    return await chat([
      { role: 'system', content: SYSTEM_INSTRUCTION_BASE },
      { role: 'user', content: `Deep analysis for: "${verseText}" (${translation}). Include Tafsir and Tajweed tips.` },
    ], { maxTokens: 2000 }) || "No analysis available.";
  } catch (error: any) {
    if (error instanceof AiUnavailableError) {
      return "AI analysis is currently disabled. Please contact the administrator to add a Groq API key (GROQ_API_KEY) in the Vercel project settings.";
    }
    return "The AI analysis feature is currently unavailable. The rest of the Quran text remains accessible.";
  }
};

export const askTutor = async (
  prompt: string,
  context?: string,
  history: { text: string; sender: 'user' | 'ai' }[] = [],
): Promise<string> => {
  try {
    const previous: ChatMessage[] = history.slice(-10).map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text.slice(0, 2000),
    }));
    return await chat([
      { role: 'system', content: SYSTEM_INSTRUCTION_BASE },
      ...previous,
      { role: 'user', content: context ? `Context: ${context}\n\nQuestion: ${prompt}` : prompt },
    ]) || "I'm sorry, I couldn't process that.";
  } catch (error) {
    if (error instanceof AiUnavailableError) {
      return "I am currently in 'Offline Mode'. To enable my AI capabilities, a Groq API key must be added to the project settings.";
    }
    return "I am having trouble connecting to my AI core right now. Please try again later.";
  }
};
