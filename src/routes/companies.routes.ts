import { Router } from 'express';
import { auth, requireRole } from '../middleware/auth.js';
import { createCompanyHandler, createCompanyValidator, listCompaniesHandler } from '../controllers/company.controller.js';

const r = Router();
r.get('/', listCompaniesHandler);
r.post('/', auth(true), requireRole(['employer','admin']), createCompanyValidator, createCompanyHandler);
export default r;
