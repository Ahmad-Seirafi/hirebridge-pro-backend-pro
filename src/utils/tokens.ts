import jwt, { type SignOptions, type Secret, type JwtPayload } from 'jsonwebtoken';
import type { StringValue } from 'ms';

const ACCESS_TTL: StringValue | number =
  (process.env.JWT_ACCESS_EXPIRES_IN as StringValue) ?? '15m';

const REFRESH_TTL: StringValue | number =
  (process.env.JWT_REFRESH_EXPIRES_IN as StringValue) ?? '7d';

const ACCESS_SECRET: Secret = process.env.JWT_ACCESS_SECRET as Secret;
const REFRESH_SECRET: Secret = process.env.JWT_REFRESH_SECRET as Secret;

if (!ACCESS_SECRET || !REFRESH_SECRET) {
  throw new Error(
    'JWT secrets are missing. Set JWT_ACCESS_SECRET and JWT_REFRESH_SECRET'
  );
}

export function signAccessToken(payload: object) {
  const opts: SignOptions = { expiresIn: ACCESS_TTL };
  return jwt.sign(payload, ACCESS_SECRET, opts);
}

export function signRefreshToken(payload: object) {
  const opts: SignOptions = { expiresIn: REFRESH_TTL };
  return jwt.sign(payload, REFRESH_SECRET, opts);
}

export function verifyAccessToken<T extends JwtPayload = JwtPayload>(token: string): T {
  return jwt.verify(token, ACCESS_SECRET) as T;
}

export function verifyRefreshToken<T extends JwtPayload = JwtPayload>(token: string): T {
  return jwt.verify(token, REFRESH_SECRET) as T;
}
