import { Request, Response } from 'express';
import { z } from 'zod';
import { register, login } from '../services/auth.service.js';
import { validate } from '../middleware/validate.js';

const registerSchema = z.object({ body: z.object({ name: z.string().min(2), email: z.string().email(), password: z.string().min(6) }) });
const loginSchema = z.object({ body: z.object({ email: z.string().email(), password: z.string().min(6) }) });

export const registerValidator = validate(registerSchema);
export const loginValidator = validate(loginSchema);

export async function registerHandler(req: Request, res: Response) {
  const { name, email, password } = req.body; const data = await register(name, email, password);
  res.status(201).json({ user: { id: data.user._id, name: data.user.name, email: data.user.email }, tokens: { access: data.accessToken, refresh: data.refreshToken } });
}
export async function loginHandler(req: Request, res: Response) {
  const { email, password } = req.body; const data = await login(email, password);
  res.status(200).json({ user: { id: data.user._id, name: data.user.name, email: data.user.email }, tokens: { access: data.accessToken, refresh: data.refreshToken } });
}
