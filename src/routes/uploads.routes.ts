import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
import { uploadHandler } from '../controllers/upload.controller.js';

const r = Router();
r.post('/', auth(true), upload.single('file'), uploadHandler);
export default r;
