import { AnyZodObject } from 'zod';
import type { Request, Response, NextFunction } from 'express';

export function validate(schema: AnyZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse({ body: req.body, params: req.params, query: req.query });
      req.body = parsed.body ?? req.body;
      next();
    } catch (e: any) {
      res.status(400).json({ error: 'ValidationError', details: e.errors });
    }
  };
}
