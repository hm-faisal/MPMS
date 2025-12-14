import config from 'config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { type Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { dirname, join } from 'path';
import swaggerUI from 'swagger-ui-express';
import { fileURLToPath } from 'url';
import { corsConfig, securityConfig, swaggerDocs } from '@/config';
import { errorHandler } from '@/errors';
import { applicationRoutes } from '@/routes';

const app: Application = express();

// app.ts / server.ts (TOP, before routes)
app.set('trust proxy', 1);

/**
 * Middlewares
 * @requires app
 */

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors(corsConfig));
app.use(helmet(securityConfig));
app.use(morgan('combined'));

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
 * Serve frontend static files (in production)
 */

if (config.get<string>('server.env') === 'production') {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = dirname(__filename);

	const publicPath = join(__dirname, '../public');

	// Serve static assets
	app.use(express.static(publicPath));

	// SPA fallback: serve index.html for any non-API route
	app.get('*', (req, res) => {
		res.sendFile(join(publicPath, 'index.html'));
	});
}

/**
 * Error handlers
 * @requires app
 */

app.use(errorHandler);

export default app;
