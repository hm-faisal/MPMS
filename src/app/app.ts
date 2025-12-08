import cors from 'cors';
import express, { type Application } from 'express';
import helmet from 'helmet';
import { corsConfig, securityConfig } from '@/config';
import { errorHandler } from '@/errors';
import { applicationRoutes } from '@/routes';

const app: Application = express();

/**
 * Middlewares
 * @requires app
 */

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors(corsConfig));
app.use(helmet(securityConfig));

/**
 * Routes
 * @requires app
 */

app.use('/api', applicationRoutes);

/**
 * Error handlers
 * @requires app
 */

app.use(errorHandler);

export default app;
