import { Response } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate.js';
import { AuthRequest } from '../middleware/auth.js';
import { apply, myApplications } from '../services/application.service.js';

const applySchema = z.object({ body: z.object({ job: z.string().length(24), coverLetter: z.string().optional() }) });
export const applyValidator = validate(applySchema);

export async function applyHandler(req: AuthRequest, res: Response) {
  const app = await apply(req.body.job, req.user!.id, req.body.coverLetter);
  res.status(201).json({ application: app });
}
export async function myApplicationsHandler(req: AuthRequest, res: Response) {
  const apps = await myApplications(req.user!.id); res.json({ applications: apps });
}
