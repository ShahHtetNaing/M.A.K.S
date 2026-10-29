// Shared Groq proxy used by the Vercel function (api/groq.ts) and the Vite dev/preview server.
// The API key stays server-side; the browser only talks to /api/groq.

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Groq retires models often; keep a fallback chain (see https://console.groq.com/docs/deprecations).
const DEFAULT_MODELS = ['openai/gpt-oss-120b', 'qwen/qwen3.8-27b', 'openai/gpt-oss-20b'];

const MAX_MESSAGES = 30;
const MAX_MESSAGE_CHARS = 8000;
const MAX_TOTAL_CHARS = 24000;
const DEFAULT_MAX_TOKENS = 1500;
const MAX_TOKENS_LIMIT = 3000;
const REQUEST_TIMEOUT_MS = 25000;

export interface GroqEnv {
  GROQ_API_KEY?: string;
  GROQ_MODEL?: string;
}

export interface GroqMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface GroqProxyResult {
  status: number;
  body: Record<string, unknown>;
}

const hasKey = (env: GroqEnv) => !!env.GROQ_API_KEY && env.GROQ_API_KEY.trim().length > 10;

const getModels = (preferred?: string) =>
  [...new Set([preferred?.trim(), ...DEFAULT_MODELS].filter((m): m is string => !!m))];

const parseRequest = (raw: string): { messages: GroqMessage[]; json: boolean; maxTokens: number } | string => {
  let data: any;
  try {
    data = JSON.parse(raw || '{}');
  } catch {
    return 'Invalid JSON body.';
  }
  const { messages } = data ?? {};
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
    return `"messages" must be an array of 1-${MAX_MESSAGES} items.`;
  }
  let total = 0;
  for (const m of messages) {
    if (!m || !['system', 'user', 'assistant'].includes(m.role) || typeof m.content !== 'string') {
      return 'Each message needs a valid role and string content.';
    }
    if (m.content.length > MAX_MESSAGE_CHARS) return 'Message too long.';
    total += m.content.length;
  }
  if (total > MAX_TOTAL_CHARS) return 'Conversation too long.';
  const requested = Number(data.maxTokens);
  const maxTokens = Number.isFinite(requested) && requested > 0 ? Math.min(requested, MAX_TOKENS_LIMIT) : DEFAULT_MAX_TOKENS;
  return {
    messages: messages.map((m: GroqMessage) => ({ role: m.role, content: m.content })),
    json: data.json === true,
    maxTokens,
  };
};

const modelParams = (model: string) =>
  model.startsWith('openai/gpt-oss')
    ? { reasoning_effort: 'low', include_reasoning: false }
    : model.startsWith('qwen/')
      ? { reasoning_effort: 'none', reasoning_format: 'hidden' }
      : { reasoning_format: 'hidden' };

const stripThinking = (text: string) => text.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

export async function handleGroqProxy(method: string, rawBody: string, env: GroqEnv): Promise<GroqProxyResult> {
  if (method === 'GET') {
    return { status: 200, body: { configured: hasKey(env) } };
  }
  if (method !== 'POST') {
    return { status: 405, body: { error: 'Method not allowed.' } };
  }
  if (!hasKey(env)) {
    return { status: 503, body: { error: 'MISSING_KEY' } };
  }

  const parsed = parseRequest(rawBody);
  if (typeof parsed === 'string') {
    return { status: 400, body: { error: parsed } };
  }

  let lastError = 'Groq request failed.';
  for (const model of getModels(env.GROQ_MODEL)) {
    try {
      const res = await fetch(GROQ_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.GROQ_API_KEY!.trim()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: parsed.messages,
          temperature: parsed.json ? 0.2 : 0.6,
          max_completion_tokens: parsed.maxTokens,
          ...(parsed.json ? { response_format: { type: 'json_object' } } : {}),
          ...modelParams(model),
        }),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });

      if (res.status === 401 || res.status === 403) {
        return { status: 502, body: { error: 'INVALID_KEY' } };
      }

      const data: any = await res.json().catch(() => ({}));
      if (!res.ok) {
        lastError = data?.error?.message || `Groq returned HTTP ${res.status}.`;
        continue;
      }

      const content = stripThinking(String(data?.choices?.[0]?.message?.content ?? ''));
      if (!content) {
        lastError = 'Groq returned an empty response.';
        continue;
      }
      return { status: 200, body: { content, model } };
    } catch (err: any) {
      lastError = err?.name === 'TimeoutError' ? 'Groq request timed out.' : err?.message || lastError;
    }
  }
  return { status: 502, body: { error: lastError } };
}
