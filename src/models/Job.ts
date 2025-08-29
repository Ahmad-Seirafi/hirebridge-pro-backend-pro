import mongoose, { Schema, InferSchemaType } from 'mongoose';
const JobSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  salaryFrom: { type: Number },
  salaryTo: { type: Number },
  currency: { type: String, default: 'EUR' },
  company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  location: { type: String, default: 'Remote' },
  tags: [{ type: String }],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });
export type Job = InferSchemaType<typeof JobSchema> & { _id: mongoose.Types.ObjectId };
export const JobModel = mongoose.model('Job', JobSchema);
