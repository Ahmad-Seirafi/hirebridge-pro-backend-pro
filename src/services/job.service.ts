import { JobModel } from '../models/Job.js';
import { CompanyModel } from '../models/Company.js';

export async function listJobs(query: any = {}, page = 1, limit = 10, sort = '-createdAt') {
  const q: any = {};
  if (query.company) q.company = query.company;
  if (query.location) q.location = { $regex: query.location, $options: 'i' };
  if (query.q) {
    q.$or = [
      { title: { $regex: query.q, $options: 'i' } },
      { description: { $regex: query.q, $options: 'i' } },
      { tags: { $in: [query.q] } }
    ];
  }
  if (query.tags) {
    const tags = String(query.tags).split(',').map((t) => t.trim()).filter(Boolean);
    if (tags.length) q.tags = { $in: tags };
  }
  const cursor = JobModel.find(q).sort(sort).populate('company','name');
  const data = await cursor.skip((page-1)*limit).limit(limit);
  const total = await JobModel.countDocuments(q);
  return { data, total };
}

export async function createJob(payload: any, userId: string) {
  const company = await CompanyModel.findById(payload.company);
  if (!company) throw new Error('Company not found');
  return JobModel.create({ ...payload, createdBy: userId });
}
