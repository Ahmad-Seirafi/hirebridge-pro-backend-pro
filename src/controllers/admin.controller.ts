import { Response } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate.js';
import { AuthRequest } from '../middleware/auth.js';
import { UserModel } from '../models/User.js';

const roleSchema = z.object({ params: z.object({ id: z.string().length(24) }), body: z.object({ role: z.enum(['user','employer','admin']) }) });
export const updateRoleValidator = validate(roleSchema);
export async function updateUserRoleHandler(req: AuthRequest, res: Response) {
  const { id } = req.params as any; const { role } = req.body as any;
  const updated = await UserModel.findByIdAndUpdate(id, { role }, { new: true }).select('-password');
  if (!updated) return res.status(404).json({ error: 'NotFound' });
  res.json({ user: updated });
}
