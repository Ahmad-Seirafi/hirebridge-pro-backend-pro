import { Router } from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './users.routes.js';
import companyRoutes from './companies.routes.js';
import jobRoutes from './jobs.routes.js';
import appRoutes from './applications.routes.js';
import uploadRoutes from './uploads.routes.js';
import healthRoutes from './health.routes.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const r = Router();
r.use('/auth', authLimiter, authRoutes);
r.use('/users', userRoutes);
r.use('/companies', companyRoutes);
r.use('/jobs', jobRoutes);
r.use('/applications', appRoutes);
r.use('/uploads', uploadRoutes);
r.use('/health', healthRoutes);
export default r;
