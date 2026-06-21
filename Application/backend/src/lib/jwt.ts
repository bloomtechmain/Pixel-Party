import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

export interface UserPayload extends JWTPayload {
  id: number;
  username: string;
  email: string;
}

export interface AdminPayload extends JWTPayload {
  role: 'admin';
  email: string;
}

const secretKey = (secret: string): Uint8Array => new TextEncoder().encode(secret);

export function signUserToken(
  payload: Omit<UserPayload, keyof JWTPayload>,
  secret: string,
  expiresIn = '7d'
): Promise<string> {
  return new SignJWT(payload as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secretKey(secret));
}

export function signAdminToken(email: string, secret: string): Promise<string> {
  return new SignJWT({ role: 'admin', email } as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('12h')
    .sign(secretKey(secret));
}

export async function verifyUserToken(token: string, secret: string): Promise<UserPayload> {
  const { payload } = await jwtVerify<UserPayload>(token, secretKey(secret));
  return payload;
}

export async function verifyAdminToken(token: string, secret: string): Promise<AdminPayload> {
  const { payload } = await jwtVerify<AdminPayload>(token, secretKey(secret));
  return payload;
}
