import { Request, Response } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate.js';
import { AuthRequest } from '../middleware/auth.js';
import { listJobs, createJob } from '../services/job.service.js';

const createJobSchema = z.object({ body: z.object({ title: z.string().min(2), description: z.string().min(10), salaryFrom: z.number().optional(), salaryTo: z.number().optional(), currency: z.string().optional(), company: z.string().length(24), location: z.string().optional(), tags: z.array(z.string()).default([]) }) });
export const createJobValidator = validate(createJobSchema);

export async function listJobsHandler(req: Request, res: Response) {
  const { page = '1', limit = '10', sort = '-createdAt', q, company, location, tags } = req.query as any;
  const { data, total } = await listJobs({ q, company, location, tags }, Number(page), Number(limit), String(sort));
  res.json({ jobs: data, meta: { page: Number(page), limit: Number(limit), total } });
}

export async function createJobHandler(req: AuthRequest, res: Response) {
  const job = await createJob(req.body, req.user!.id);
  res.status(201).json({ job });
}
