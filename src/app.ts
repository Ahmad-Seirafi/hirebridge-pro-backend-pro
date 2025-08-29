import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import apiRoutes from './routes/index.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import swaggerDoc from './docs/swagger.json' assert { type: 'json' };
import path from 'node:path';
import { env } from './config/config.js';
import { requestId } from './middleware/requestId.js';

const app = express();
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGINS ? env.CORS_ORIGINS.split(',').map(s=>s.trim()).filter(Boolean) : true }));
app.use(requestId);
app.use(compression());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use('/uploads', express.static(path.resolve(process.cwd(), 'uploads')));

app.use('/api', apiLimiter, apiRoutes);
app.use(notFound);
app.use(errorHandler);
export default app;
