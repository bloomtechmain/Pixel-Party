import { Hono } from 'hono';
import type { Env } from '../index';
import { sendContactEmail } from '../lib/email';
import type { Contact } from '../types';

const contact = new Hono<Env>();

contact.post('/', async (c) => {
  const body = await c.req.json<{
    name?: string;
    email?: string;
    project_type?: string;
    budget?: string;
    message?: string;
  }>();
  const { name, email, project_type, budget, message } = body;

  const errors: string[] = [];
  if (!name || name.trim().length === 0) errors.push('Name is required');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Valid email is required');
  if (!message || message.trim().length === 0) errors.push('Message is required');
  if (errors.length) return c.json({ success: false, errors }, 400);

  const saved = await c.env.DB
    .prepare('INSERT INTO contacts (name, email, project_type, budget, message) VALUES (?, ?, ?, ?, ?) RETURNING *')
    .bind(name!.trim(), email!.toLowerCase().trim(), project_type ?? null, budget ?? null, message!.trim())
    .first<Contact>();

  if (!saved) return c.json({ success: false, message: 'Failed to save contact' }, 500);

  // Fire-and-forget — DB save is the source of truth
  sendContactEmail(
    { name: saved.name, email: saved.email, project_type: saved.project_type, budget: saved.budget, message: saved.message },
    c.env.RESEND_API_KEY
  ).catch((err: unknown) => console.error('Email send failed:', err));

  return c.json({ success: true, data: saved, message: 'Message sent successfully' }, 201);
});

export default contact;
