import { Hono } from 'hono';
import type { Env } from '../index';
import { authMiddleware } from '../middleware/auth';
import type { Room } from '../types';

const rooms = new Hono<Env>();

rooms.use('*', authMiddleware);

function generateCode(): string {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

rooms.get('/', async (c) => {
  const { results } = await c.env.DB
    .prepare(`
      SELECT r.*, u.username AS host_username,
        (SELECT COUNT(*) FROM room_players rp WHERE rp.room_id = r.id) AS player_count
      FROM rooms r
      JOIN users u ON r.host_id = u.id
      WHERE r.is_active = 1
      ORDER BY r.created_at DESC
    `)
    .all<Room>();
  return c.json({ success: true, data: results });
});

rooms.post('/', async (c) => {
  const body = await c.req.json<{ name?: string; max_players?: number }>();
  const { name, max_players = 8 } = body;

  if (!name || name.trim().length < 1 || name.trim().length > 100) {
    return c.json({ success: false, message: 'Room name must be 1-100 characters' }, 400);
  }

  const { id: host_id } = c.get('user');
  const room = await c.env.DB
    .prepare('INSERT INTO rooms (name, code, host_id, max_players) VALUES (?, ?, ?, ?) RETURNING *')
    .bind(name.trim(), generateCode(), host_id, max_players)
    .first<Room>();

  return c.json({ success: true, data: room }, 201);
});

rooms.get('/:code', async (c) => {
  const room = await c.env.DB
    .prepare(`
      SELECT r.*, u.username AS host_username
      FROM rooms r
      JOIN users u ON r.host_id = u.id
      WHERE r.code = ?
    `)
    .bind(c.req.param('code'))
    .first<Room>();

  if (!room) return c.json({ success: false, message: 'Room not found' }, 404);
  return c.json({ success: true, data: room });
});

rooms.post('/:code/join', async (c) => {
  const { id: user_id } = c.get('user');
  const room = await c.env.DB
    .prepare('SELECT * FROM rooms WHERE code = ? AND is_active = 1')
    .bind(c.req.param('code'))
    .first<Room>();

  if (!room) return c.json({ success: false, message: 'Room not found' }, 404);

  await c.env.DB
    .prepare('INSERT OR IGNORE INTO room_players (room_id, user_id) VALUES (?, ?)')
    .bind(room.id, user_id)
    .run();

  return c.json({ success: true, message: 'Joined room', data: room });
});

rooms.delete('/:code', async (c) => {
  const { id: user_id } = c.get('user');
  const result = await c.env.DB
    .prepare('UPDATE rooms SET is_active = 0 WHERE code = ? AND host_id = ?')
    .bind(c.req.param('code'), user_id)
    .run();

  if (result.meta.changes === 0) {
    return c.json({ success: false, message: 'Not authorized or room not found' }, 403);
  }
  return c.json({ success: true, message: 'Room closed' });
});

export default rooms;
