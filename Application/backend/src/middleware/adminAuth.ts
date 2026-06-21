import type { MiddlewareHandler } from 'hono';
import { verifyAdminToken } from '../lib/jwt';
import type { Env } from '../index';

export const adminAuth: MiddlewareHandler<Env> = async (c, next) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return c.json({ success: false, message: 'Unauthorized' }, 401);
  }
  try {
    const payload = await verifyAdminToken(authHeader.slice(7), c.env.JWT_SECRET);
    if (payload.role !== 'admin') {
      return c.json({ success: false, message: 'Forbidden' }, 403);
    }
    await next();
  } catch {
    return c.json({ success: false, message: 'Invalid or expired token' }, 401);
  }
};
