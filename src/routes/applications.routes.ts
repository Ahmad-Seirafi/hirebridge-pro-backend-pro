import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { applyHandler, applyValidator, myApplicationsHandler } from '../controllers/application.controller.js';

const r = Router();
r.get('/me', auth(true), myApplicationsHandler);
r.post('/', auth(true), applyValidator, applyHandler);
export default r;
