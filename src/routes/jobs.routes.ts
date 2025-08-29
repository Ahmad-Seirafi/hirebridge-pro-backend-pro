import { Router } from 'express';
import { auth, requireRole } from '../middleware/auth.js';
import { createJobHandler, createJobValidator, listJobsHandler } from '../controllers/job.controller.js';

const r = Router();
r.get('/', listJobsHandler);
r.post('/', auth(true), requireRole(['employer','admin']), createJobValidator, createJobHandler);
export default r;
