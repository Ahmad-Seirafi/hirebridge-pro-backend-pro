import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/config.js';

export interface AuthRequest extends Request {
  user?: { id: string; role: 'user' | 'employer' | 'admin' };
}

export function auth(required: boolean = true) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header) {
      if (required) return res.status(401).json({ error: 'No token provided' });
      return next();
    }
    const token = header.replace('Bearer ', '');
    try {
      const decoded = jwt.verify(token, env.JWT.ACCESS_SECRET) as any;
      req.user = { id: decoded.sub ?? decoded.id, role: decoded.role ?? 'user' };
      next();
    } catch {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
}

export function requireRole(roles: Array<'user'|'employer'|'admin'>) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) return res.status(403).json({ error: 'Forbidden' });
    next();
  };
}
