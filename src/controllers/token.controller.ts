import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { verifyRefreshToken, signAccessToken } from '../utils/tokens.js';

export const refreshHandler = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body as { refreshToken?: string };
    if (!refreshToken) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: 'refreshToken is required' });
    }

    const payload = verifyRefreshToken<{ userId: string; role?: string }>(refreshToken);

    const accessToken = signAccessToken({
      userId: payload.userId,
      role: payload.role,
    });

    return res.status(httpStatus.OK).json({ accessToken });
  } catch (err) {
    return next(err);
  }
};
