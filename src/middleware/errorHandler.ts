import type { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError.js';
export function notFound(req: Request, res: Response) { res.status(404).json({ error: 'NotFound', path: req.originalUrl }); }
export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const status = err instanceof ApiError ? err.statusCode : 500;
  res.status(status).json({ error: err.name ?? 'Error', message: err.message ?? 'Internal Server Error' });
}
