import { handleGroqProxy } from '../../server/groq';

export default async (req: Request): Promise<Response> => {
  const raw = req.method === 'POST' ? await req.text() : '';
  const { status, body } = await handleGroqProxy(req.method, raw, {
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    GROQ_MODEL: process.env.GROQ_MODEL,
  });
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
};

export const config = { path: '/api/groq' };
