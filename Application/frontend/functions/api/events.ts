import { type Env, listImages, captionFor } from '../../server/drive';

// GET /api/events → images in the client's Drive folder, newest first.
// Cached at the edge for 2 minutes so new uploads appear quickly
// without calling the Drive API on every page view.
export const onRequestGet = async (ctx: { request: Request; env: Env; waitUntil: (p: Promise<unknown>) => void }) => {
  const { request, env } = ctx;

  if (!env.GOOGLE_API_KEY) {
    return json({ error: 'GOOGLE_API_KEY is not configured' }, 500, 'no-store');
  }

  const cache = (caches as unknown as { default: Cache }).default;
  const cacheKey = new Request(new URL('/api/events', request.url).toString());
  const hit = await cache.match(cacheKey);
  if (hit) return hit;

  try {
    const files = await listImages(env);
    const items = files.map(f => ({
      id: f.id,
      src: `/api/image/${f.id}`,
      caption: captionFor(f),
      width: f.imageMediaMetadata?.width ?? null,
      height: f.imageMediaMetadata?.height ?? null,
      createdTime: f.createdTime,
    }));
    const res = json({ items }, 200, 'public, max-age=60, s-maxage=120');
    ctx.waitUntil(cache.put(cacheKey, res.clone()));
    return res;
  } catch (err) {
    console.error(err);
    return json({ error: 'Could not load events' }, 502, 'no-store');
  }
};

function json(body: unknown, status: number, cacheControl: string) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': cacheControl },
  });
}
