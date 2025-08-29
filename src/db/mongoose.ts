import mongoose from 'mongoose';
import { env } from '../config/config.js';
import { logger } from '../config/logger.js';

export async function connectDB() {
  await mongoose.connect(env.MONGO_URI);
  logger.info('✓ Connected to MongoDB');
}
