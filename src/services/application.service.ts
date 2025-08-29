import { ApplicationModel } from '../models/Application.js';
export function apply(job: string, applicant: string, coverLetter?: string) {
  return ApplicationModel.create({ job, applicant, coverLetter });
}
export function myApplications(applicant: string) {
  return ApplicationModel.find({ applicant }).populate('job', 'title');
}
