import { type Env, folderId, getFile } from '../../../server/drive';

// GET /api/image/:id[?w=1600] → image bytes from the client's Drive folder.
// Only files inside that folder are served, resized via Drive's thumbnail
// service, and cached at the edge for a day.
const WIDTHS = [480, 960, 1600, 2400];

export const onRequestGet = async (ctx: {
  request: Request;
  env: Env;
  params: { id: string };
  waitUntil: (p: Promise<unknown>) => void;
}) => {
  const { request, env, params } = ctx;
  const id = params.id;
  if (!/^[A-Za-z0-9_-]{10,100}$/.test(id)) return new Response('Bad id', { status: 400 });

  const url = new URL(request.url);
  const asked = Number(url.searchParams.get('w')) || 1600;
  const w = WIDTHS.find(x => x >= asked) ?? WIDTHS[WIDTHS.length - 1];

  const cache = (caches as unknown as { default: Cache }).default;
  const cacheKey = new Request(new URL(`/api/image/${id}?w=${w}`, request.url).toString());
  const hit = await cache.match(cacheKey);
  if (hit) return hit;

  const file = await getFile(env, id).catch(() => null);
  if (!file || !file.parents?.includes(folderId(env)) || !file.mimeType.startsWith('image/')) {
    return new Response('Not found', { status: 404 });
  }

  // Resized version from Drive's thumbnail service; fall back to the original.
  let upstream: Response | null = null;
  if (file.thumbnailLink) {
    upstream = await fetch(file.thumbnailLink.replace(/=s\d+(-[a-z0-9-]+)?$/i, `=w${w}`));
    if (!upstream.ok) upstream = null;
  }
  if (!upstream) {
    upstream = await fetch(
      `https://www.googleapis.com/drive/v3/files/${id}?alt=media&key=${env.GOOGLE_API_KEY}`,
    );
    if (!upstream.ok) return new Response('Upstream error', { status: 502 });
  }

  const res = new Response(upstream.body, {
    headers: {
      'Content-Type': upstream.headers.get('Content-Type') || file.mimeType,
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
  ctx.waitUntil(cache.put(cacheKey, res.clone()));
  return res;
};
