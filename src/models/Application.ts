import mongoose, { Schema, InferSchemaType } from 'mongoose';
const ApplicationSchema = new Schema({
  job: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
  applicant: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  coverLetter: { type: String, default: '' },
  status: { type: String, enum: ['submitted','review','interview','offer','rejected'], default: 'submitted' }
}, { timestamps: true });
export type Application = InferSchemaType<typeof ApplicationSchema> & { _id: mongoose.Types.ObjectId };
export const ApplicationModel = mongoose.model('Application', ApplicationSchema);
