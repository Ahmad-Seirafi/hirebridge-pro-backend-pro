import mongoose, { Schema, InferSchemaType } from 'mongoose';
const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user','employer','admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});
export type User = InferSchemaType<typeof UserSchema> & { _id: mongoose.Types.ObjectId };
export const UserModel = mongoose.model('User', UserSchema);
