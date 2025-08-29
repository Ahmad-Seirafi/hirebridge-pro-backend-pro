import 'dotenv/config';

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: Number(process.env.PORT ?? 3000),
  MONGO_URI: process.env.MONGO_URI ?? 'mongodb://localhost:27017/hirebridge',
  JWT: {
    ACCESS_SECRET: process.env.JWT_ACCESS_SECRET ?? 'dev-access',
    REFRESH_SECRET: process.env.JWT_REFRESH_SECRET ?? 'dev-refresh',
    ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN ?? '15m',
    REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN ?? '7d'
  },
  CORS_ORIGINS: process.env.CORS_ORIGINS ?? ''
} as const;
