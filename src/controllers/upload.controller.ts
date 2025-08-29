import type { Request, Response } from 'express';
import path from 'node:path';

export async function uploadHandler(req: Request, res: Response) {
  const file = (req as any).file as Express.Multer.File | undefined;
  if (!file) return res.status(400).json({ error: 'NoFile', message: 'No file uploaded' });
  const url = `/uploads/${path.basename(file.path)}`;
  res.status(201).json({ file: { filename: file.filename, mimetype: file.mimetype, size: file.size, url } });
}
