import { connectDB } from './mongoose.js';
import { UserModel } from '../models/User.js';
import { CompanyModel } from '../models/Company.js';
import { JobModel } from '../models/Job.js';
import { hashPassword } from '../utils/password.js';

async function seed() {
  await connectDB();
  await UserModel.deleteMany({});
  await CompanyModel.deleteMany({});
  await JobModel.deleteMany({});

  const adminPass = await hashPassword('secret123');
  const employerPass = await hashPassword('secret123');
  const userPass = await hashPassword('secret123');

  const admin = await UserModel.create({ name: 'Admin', email: 'admin@example.com', password: adminPass, role: 'admin' });
  const employer = await UserModel.create({ name: 'Employer', email: 'employer@example.com', password: employerPass, role: 'employer' });
  const user = await UserModel.create({ name: 'Ahmad', email: 'ahmad@example.com', password: userPass, role: 'user' });

  const company = await CompanyModel.create({ name: 'HireBridge GmbH', owner: employer._id, website: 'https://hirebridge.example.com', location: 'Berlin' });
  await JobModel.create({ title: 'Backend Engineer', description: 'Work with Node.js/TS on scalable services.', company: company._id, createdBy: employer._id, salaryFrom: 4000, salaryTo: 6000, tags: ['node','typescript','mongodb'] });

  console.log('Seed complete:', { admin: admin.email, employer: employer.email, user: user.email });
  process.exit(0);
}
seed().catch((e) => { console.error(e); process.exit(1); });
