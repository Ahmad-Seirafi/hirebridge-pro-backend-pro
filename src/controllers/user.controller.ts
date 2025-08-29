import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.js';
import { getMe } from '../services/user.service.js';
export async function meHandler(req: AuthRequest, res: Response) { const me = await getMe(req.user!.id); res.json({ user: me }); }
