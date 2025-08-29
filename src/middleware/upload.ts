import multer from 'multer';
import fs from 'node:fs';
import path from 'node:path';

const uploadDir = path.resolve(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ts = Date.now();
    const safe = file.originalname.replace(/[^a-zA-Z0-9_.-]/g, '_');
    cb(null, `${ts}-${safe}`);
  }
});

export const upload = multer({
  storage,
  limits: { fileSize: (Number(process.env.UPLOAD_MAX_SIZE_MB ?? 5)) * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allow = (process.env.UPLOAD_MIME_ALLOW ?? 'image/').split(',').map(s => s.trim());
    if (allow.some(prefix => file.mimetype.startsWith(prefix))) return cb(null, true);
    cb(new Error('Invalid file type'));
  }
});
