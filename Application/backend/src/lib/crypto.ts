// PBKDF2 password hashing via Web Crypto API (crypto.subtle).
// Replaces bcryptjs — crypto.subtle operations run in hardware and do NOT
// count against Workers' 10ms CPU time limit.
// Stored format: "iterations:saltHex:hashHex" — self-describing for future migration.

const ITERATIONS = 310_000;
const HASH_ALGORITHM = 'SHA-256';
const KEY_LENGTH = 32; // bytes

function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function hexToBuffer(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return bytes;
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: ITERATIONS, hash: HASH_ALGORITHM },
    keyMaterial,
    KEY_LENGTH * 8
  );
  return `${ITERATIONS}:${bufferToHex(salt.buffer)}:${bufferToHex(bits)}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split(':');
  if (parts.length !== 3) return false;
  const [iterStr, saltHex, storedHashHex] = parts;
  const salt = hexToBuffer(saltHex);
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: parseInt(iterStr, 10), hash: HASH_ALGORITHM },
    keyMaterial,
    KEY_LENGTH * 8
  );
  const derived = bufferToHex(bits);
  if (derived.length !== storedHashHex.length) return false;
  let diff = 0;
  for (let i = 0; i < derived.length; i++) {
    diff |= derived.charCodeAt(i) ^ storedHashHex.charCodeAt(i);
  }
  return diff === 0;
}
