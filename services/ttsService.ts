// Arabic pronunciation via Google Translate TTS, with the browser's speech
// synthesis as a fallback when the audio can't be fetched.

const MAX_CHUNK_CHARS = 180;

const ARABIC_CHAR = '\\u0600-\\u06FF\\u0750-\\u077F\\u08A0-\\u08FF\\uFB50-\\uFDFF\\uFE70-\\uFEFF';
const ARABIC_RUN = new RegExp(`[${ARABIC_CHAR}](?:[${ARABIC_CHAR}\\s]*[${ARABIC_CHAR}])?`, 'g');
const ARABIC_TEST = new RegExp(`[${ARABIC_CHAR}]`);

export const getTtsUrl = (text: string) =>
  `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=ar&client=tw-ob`;

export const hasArabic = (text: string) => ARABIC_TEST.test(text);

/** Arabic-script segments of mixed text, in order (e.g. "ب (Ba) ت (Ta)" -> ["ب", "ت"]). */
export const extractArabicSegments = (text: string): string[] => text.match(ARABIC_RUN) ?? [];

/** Splits text into pieces the TTS endpoint accepts (~200 char limit). */
const chunkText = (text: string): string[] => {
  const chunks: string[] = [];
  let current = '';
  for (const word of text.trim().split(/\s+/).filter(Boolean)) {
    const piece = word.length > MAX_CHUNK_CHARS ? word.slice(0, MAX_CHUNK_CHARS) : word;
    if (current && current.length + 1 + piece.length > MAX_CHUNK_CHARS) {
      chunks.push(current);
      current = piece;
    } else {
      current = current ? `${current} ${piece}` : piece;
    }
  }
  if (current) chunks.push(current);
  return chunks;
};

const speakWithBrowser = (text: string): Promise<void> =>
  new Promise((resolve, reject) => {
    const synth = typeof window !== 'undefined' ? window.speechSynthesis : undefined;
    if (!synth) return reject(new Error('TTS_UNAVAILABLE'));
    const voices = synth.getVoices();
    const arabicVoice = voices.find(v => v.lang.toLowerCase().startsWith('ar'));
    if (voices.length > 0 && !arabicVoice) return reject(new Error('TTS_UNAVAILABLE'));
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    if (arabicVoice) utterance.voice = arabicVoice;
    utterance.onend = () => resolve();
    utterance.onerror = () => reject(new Error('TTS_UNAVAILABLE'));
    synth.cancel();
    synth.speak(utterance);
  });

let current: { cancel: () => void } | null = null;

export const stopSpeaking = () => {
  current?.cancel();
  current = null;
};

/**
 * Plays Arabic text. Resolves when playback ends or is interrupted by another
 * call / stopSpeaking(); rejects only if no audio source works.
 */
export const speakArabic = (text: string): Promise<void> => {
  stopSpeaking();
  const chunks = chunkText(text);
  if (chunks.length === 0) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const audio = new Audio();
    let index = 0;
    let done = false;
    let fellBack = false;

    const finish = (error?: Error) => {
      if (done) return;
      done = true;
      if (current === session) current = null;
      audio.onended = null;
      audio.onerror = null;
      error ? reject(error) : resolve();
    };

    const session = {
      cancel: () => {
        if (done) return;
        audio.pause();
        audio.removeAttribute('src');
        audio.load();
        if (fellBack) window.speechSynthesis?.cancel();
        finish();
      },
    };
    current = session;

    const fallback = () => {
      if (done || fellBack) return;
      fellBack = true;
      speakWithBrowser(chunks.slice(Math.max(index - 1, 0)).join(' ')).then(() => finish(), finish);
    };

    const playNext = () => {
      if (done) return;
      if (index >= chunks.length) return finish();
      audio.src = getTtsUrl(chunks[index++]);
      audio.play().catch(err => {
        if (err?.name !== 'AbortError') fallback();
      });
    };

    audio.onended = playNext;
    audio.onerror = fallback;
    playNext();
  });
};
