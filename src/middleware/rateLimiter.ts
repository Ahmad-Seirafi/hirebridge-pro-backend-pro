import rateLimit from 'express-rate-limit';
export const apiLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 300 });
export const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 50 });
