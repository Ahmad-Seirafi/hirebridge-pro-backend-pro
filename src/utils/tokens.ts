import jwt from 'jsonwebtoken';
import { env } from '../config/config.js';

export function signAccessToken(payload: object) {
  return jwt.sign(payload, env.JWT.ACCESS_SECRET, { expiresIn: env.JWT.ACCESS_EXPIRES_IN });
}
export function signRefreshToken(payload: object) {
  return jwt.sign(payload, env.JWT.REFRESH_SECRET, { expiresIn: env.JWT.REFRESH_EXPIRES_IN });
}
export function verifyAccessToken(token: string) { return jwt.verify(token, env.JWT.ACCESS_SECRET) as any; }
export function verifyRefreshToken(token: string) { return jwt.verify(token, env.JWT.REFRESH_SECRET) as any; }
