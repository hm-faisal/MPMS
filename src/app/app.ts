import config from 'config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { type Application } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import swaggerUI from 'swagger-ui-express';
import {
	corsConfig,
	rateLimitConfig,
	securityConfig,
	swaggerDocs,
} from '@/config';
import { errorHandler } from '@/errors';
import { applicationRoutes } from '@/routes';

const app: Application = express();

/**
 * Middlewares
 * @requires app
 */

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors(corsConfig));
app.use(helmet(securityConfig));
app.use(rateLimit(rateLimitConfig));

/**
 * Swagger API docs
 */

if (config.get<boolean>('swagger.enabled')) {
	app.use(
		`/${config.get<string>('swagger.path')}`,
		swaggerUI.serve,
		swaggerUI.setup(swaggerDocs),
	);
}

/**
 * Routes
 * @requires app
 */

app.use('/health', (_req, res) => {
	res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});
app.use('/api/v1', applicationRoutes);

/**
 * Error handlers
 * @requires app
 */

app.use(errorHandler);

export default app;
