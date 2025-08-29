import { Router } from 'express';
import { healthHandler } from '../controllers/health.controller.js';
const r = Router();
r.get('/', healthHandler);
export default r;
