import mongoose, { Schema, InferSchemaType } from 'mongoose';
const CompanySchema = new Schema({
  name: { type: String, required: true, trim: true },
  website: { type: String },
  location: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  logoUrl: { type: String }
}, { timestamps: true });
export type Company = InferSchemaType<typeof CompanySchema> & { _id: mongoose.Types.ObjectId };
export const CompanyModel = mongoose.model('Company', CompanySchema);
