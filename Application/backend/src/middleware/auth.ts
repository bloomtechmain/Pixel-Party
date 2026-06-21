import type { MiddlewareHandler } from 'hono';
import { verifyUserToken } from '../lib/jwt';
import type { Env } from '../index';

export const authMiddleware: MiddlewareHandler<Env> = async (c, next) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return c.json({ success: false, message: 'No token provided' }, 401);
  }
  try {
    const payload = await verifyUserToken(authHeader.slice(7), c.env.JWT_SECRET);
    c.set('user', { id: payload.id, username: payload.username, email: payload.email });
    await next();
  } catch {
    return c.json({ success: false, message: 'Invalid or expired token' }, 401);
  }
};
