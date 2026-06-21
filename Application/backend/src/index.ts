import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import type { AuthUser } from './types';
import authRoutes from './routes/auth';
import roomRoutes from './routes/rooms';
import contactRoutes from './routes/contact';
import adminRoutes from './routes/admin';

export type Env = {
  Bindings: {
    DB: D1Database;
    JWT_SECRET: string;
    RESEND_API_KEY: string;
    CORS_ORIGIN: string;
    ADMIN_EMAIL: string;
    ADMIN_PASSWORD: string;
  };
  Variables: {
    user: AuthUser;
  };
};

const app = new Hono<Env>();

app.use('*', logger());

// CORS must read c.env, so it's wrapped in a per-request closure
app.use('*', async (c, next) =>
  cors({
    origin: c.env.CORS_ORIGIN,
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })(c, next)
);

app.get('/health', (c) => c.json({ status: 'ok', timestamp: new Date().toISOString() }));

app.route('/api/auth', authRoutes);
app.route('/api/rooms', roomRoutes);
app.route('/api/contact', contactRoutes);
app.route('/api/admin', adminRoutes);

app.notFound((c) => c.json({ success: false, message: 'Not found' }, 404));

app.onError((err, c) => {
  console.error(err.message);
  return c.json({ success: false, message: 'Internal server error' }, 500);
});

// Workers export — replaces app.listen()
export default app;
