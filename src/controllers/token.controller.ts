import { Request, Response } from 'express';
import { signAccessToken, verifyRefreshToken } from '../utils/tokens.js';
export async function refreshHandler(req: Request, res: Response) {
  const { refreshToken } = req.body ?? {};
  if (!refreshToken) return res.status(400).json({ error: 'ValidationError', message: 'refreshToken required' });
  try {
    const payload = verifyRefreshToken(refreshToken) as any;
    const access = signAccessToken({ sub: payload.sub, role: payload.role });
    return res.json({ accessToken: access });
  } catch { return res.status(401).json({ error: 'InvalidRefreshToken' }); }
}
