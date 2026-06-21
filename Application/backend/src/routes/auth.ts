import { Hono } from 'hono';
import type { Env } from '../index';
import { hashPassword, verifyPassword } from '../lib/crypto';
import { signUserToken } from '../lib/jwt';
import { authMiddleware } from '../middleware/auth';
import type { User } from '../types';

const auth = new Hono<Env>();

auth.post('/register', async (c) => {
  const body = await c.req.json<{ username?: string; email?: string; password?: string }>();
  const { username, email, password } = body;

  const errors: string[] = [];
  if (!username || username.trim().length < 3 || username.trim().length > 50)
    errors.push('Username must be 3-50 characters');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.push('Valid email is required');
  if (!password || password.length < 6)
    errors.push('Password must be at least 6 characters');
  if (errors.length) return c.json({ success: false, errors }, 400);

  const existing = await c.env.DB
    .prepare('SELECT id FROM users WHERE email = ? OR username = ?')
    .bind(email!.toLowerCase().trim(), username!.trim())
    .first<{ id: number }>();
  if (existing) {
    return c.json({ success: false, message: 'Email or username already in use' }, 409);
  }

  const password_hash = await hashPassword(password!);
  const result = await c.env.DB
    .prepare('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?) RETURNING id, username, email, created_at')
    .bind(username!.trim(), email!.toLowerCase().trim(), password_hash)
    .first<Pick<User, 'id' | 'username' | 'email' | 'created_at'>>();

  if (!result) return c.json({ success: false, message: 'Registration failed' }, 500);

  const token = await signUserToken(
    { id: result.id, username: result.username, email: result.email },
    c.env.JWT_SECRET
  );
  return c.json({ success: true, data: { user: result, token } }, 201);
});

auth.post('/login', async (c) => {
  const body = await c.req.json<{ email?: string; password?: string }>();
  const { email, password } = body;

  if (!email || !password) {
    return c.json({ success: false, message: 'Email and password are required' }, 400);
  }

  const user = await c.env.DB
    .prepare('SELECT * FROM users WHERE email = ?')
    .bind(email.toLowerCase().trim())
    .first<User>();

  if (!user || !(await verifyPassword(password, user.password_hash))) {
    return c.json({ success: false, message: 'Invalid credentials' }, 401);
  }

  const token = await signUserToken(
    { id: user.id, username: user.username, email: user.email },
    c.env.JWT_SECRET
  );
  const { password_hash: _omit, ...safeUser } = user;
  return c.json({ success: true, data: { user: safeUser, token } });
});

auth.get('/me', authMiddleware, async (c) => {
  const { id } = c.get('user');
  const user = await c.env.DB
    .prepare('SELECT id, username, email, created_at FROM users WHERE id = ?')
    .bind(id)
    .first<Pick<User, 'id' | 'username' | 'email' | 'created_at'>>();

  if (!user) return c.json({ success: false, message: 'User not found' }, 404);
  return c.json({ success: true, data: user });
});

export default auth;
