import { Request, Response } from 'express';
import { verifyRefreshToken, signAccessToken } from '../utils/tokens.js';

export const refresh = (req: Request, res: Response) => {
  const { refreshToken } = req.body as { refreshToken: string };
  const payload = verifyRefreshToken(refreshToken); // يحتوي userId/role… حسب ما وقّعتَه
  const access = signAccessToken({ userId: (payload as any).userId, role: (payload as any).role });
  return res.json({ accessToken: access });
};
