import { CompanyModel } from '../models/Company.js';
export function createCompany(name: string, owner: string, website?: string, location?: string, logoUrl?: string) {
  return CompanyModel.create({ name, owner, website, location, logoUrl });
}
export function listCompanies(query: any = {}, page = 1, limit = 10, sort = '-createdAt') {
  const q: any = {};
  if (query.owner) q.owner = query.owner;
  if (query.q) q.name = { $regex: query.q, $options: 'i' };
  const cursor = CompanyModel.find(q).sort(sort);
  return cursor.skip((page-1)*limit).limit(limit);
}
export function countCompanies(query: any = {}) {
  const q: any = {};
  if (query.owner) q.owner = query.owner;
  if (query.q) q.name = { $regex: query.q, $options: 'i' };
  return CompanyModel.countDocuments(q);
}
