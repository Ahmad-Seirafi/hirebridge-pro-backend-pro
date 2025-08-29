import { api, elevateToEmployer } from './setup.js';

describe('Jobs CRUD happy path', () => {
  it('creates a company and posts a job (employer role)', async () => {
    await api.post('/api/auth/register').send({ name: 'Owner', email: 'owner@test.com', password: 'secret12' }).expect(201);
    await elevateToEmployer('owner@test.com');
    const login = await api.post('/api/auth/login').send({ email: 'owner@test.com', password: 'secret12' }).expect(200);
    const token = login.body.tokens.access;
    const company = await api.post('/api/companies').set('Authorization', `Bearer ${token}`).send({ name: 'HB GmbH', website: 'https://hb.example.com', location: 'Berlin' }).expect(201);
    const cId = company.body.company._id;
    const job = await api.post('/api/jobs').set('Authorization', `Bearer ${token}`).send({ title: 'Node.js Backend Engineer', description: 'Build APIs', company: cId, salaryFrom: 4000, salaryTo: 6000, tags: ['node','ts'] }).expect(201);
    expect(job.body.job.title).toBe('Node.js Backend Engineer');
    const list = await api.get('/api/jobs').query({ page: 1, limit: 5, q: 'node' }).expect(200);
    expect(Array.isArray(list.body.jobs)).toBe(true);
    expect(list.body.meta.total).toBeGreaterThan(0);
  });
});
