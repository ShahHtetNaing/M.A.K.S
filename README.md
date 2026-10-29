# M.A.K.S — Modern Arabic & Quran Study

React + Vite app for learning Arabic and studying the Quran.

- **AI Tutor, Lughat word analysis, verse deep-dives** — powered by the [Groq API](https://console.groq.com) through a small server-side proxy (`/api/groq`), so the key is never shipped to the browser. Without a key the site runs in offline mode: the AI features show a notice and everything else keeps working.
- **Pronunciation** — lesson "Pronounce" buttons, inline Arabic word cards and the Lughat panel play Arabic audio from Google Translate TTS, falling back to the browser's speech synthesis if that fails.
- **Quran explorer** — Surah index, word-level analysis, global Ayat search and full-Surah recitation by Sheikh Mishary Rashid Alafasy (alquran.cloud / islamic.network).

## Run locally

Prerequisites: Node.js 18+

1. `npm install`
2. Copy `.env.example` to `.env.local` and set `GROQ_API_KEY` (optional — leave empty for offline mode).
3. `npm run dev` → http://localhost:3000

The Vite dev/preview server serves `/api/groq` itself (see `vite.config.ts`).

## Deploy (Vercel)

Import the repo in Vercel; it auto-detects Vite (build `npm run build`, output `dist`) and deploys `api/groq.ts` as a serverless function at `/api/groq`.
Set `GROQ_API_KEY` (and optionally `GROQ_MODEL`) under **Project Settings → Environment Variables**, then redeploy.

Default model chain: `GROQ_MODEL` (if set) → `openai/gpt-oss-120b` → `qwen/qwen3.8-27b` → `openai/gpt-oss-20b`. Groq retires models regularly; check https://console.groq.com/docs/deprecations if AI calls start failing.
