import { Request, Response } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate.js';
import { AuthRequest } from '../middleware/auth.js';
import { createCompany, listCompanies, countCompanies } from '../services/company.service.js';

const createCompanySchema = z.object({ body: z.object({ name: z.string().min(2), website: z.string().url().optional(), location: z.string().optional(), logoUrl: z.string().optional() }) });
export const createCompanyValidator = validate(createCompanySchema);

export async function createCompanyHandler(req: AuthRequest, res: Response) {
  const owner = req.user!.id; const { name, website, location, logoUrl } = req.body;
  const company = await createCompany(name, owner, website, location, logoUrl);
  res.status(201).json({ company });
}

export async function listCompaniesHandler(req: Request, res: Response) {
  const { page = '1', limit = '10', sort = '-createdAt', q, owner } = req.query as any;
  const companies = await listCompanies({ q, owner }, Number(page), Number(limit), String(sort));
  const total = await countCompanies({ q, owner });
  res.json({ companies, meta: { page: Number(page), limit: Number(limit), total } });
}
