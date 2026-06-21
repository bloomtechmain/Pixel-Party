import { Hono } from 'hono';
import type { Env } from '../index';
import { signAdminToken } from '../lib/jwt';
import { adminAuth } from '../middleware/adminAuth';
import type { Contact } from '../types';

const admin = new Hono<Env>();

admin.post('/login', async (c) => {
  const body = await c.req.json<{ email?: string; password?: string }>();
  const { email, password } = body;

  if (!email || !password || email !== c.env.ADMIN_EMAIL || password !== c.env.ADMIN_PASSWORD) {
    return c.json({ success: false, message: 'Invalid credentials' }, 401);
  }

  const token = await signAdminToken(c.env.ADMIN_EMAIL, c.env.JWT_SECRET);
  return c.json({ success: true, data: { token }, message: 'Admin logged in successfully' });
});

admin.get('/contacts', adminAuth, async (c) => {
  const { results } = await c.env.DB
    .prepare('SELECT * FROM contacts ORDER BY created_at DESC')
    .all<Contact>();
  return c.json({ success: true, data: results });
});

admin.patch('/contacts/:id/status', adminAuth, async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json<{ status?: string }>();
  const { status } = body;

  const allowed = ['new', 'reviewed', 'closed'];
  if (!status || !allowed.includes(status)) {
    return c.json({ success: false, message: 'Invalid status' }, 400);
  }

  const updated = await c.env.DB
    .prepare('UPDATE contacts SET status = ? WHERE id = ? RETURNING *')
    .bind(status, id)
    .first<Contact>();

  if (!updated) return c.json({ success: false, message: 'Contact not found' }, 404);
  return c.json({ success: true, data: updated });
});

export default admin;
