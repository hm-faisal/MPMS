import dotenv from 'dotenv';

dotenv.config();
export default {
	/**
	 * Server
	 */

	server: {
		host: process.env['HOST'],
		port: process.env['PORT'],
		env: process.env['NODE_ENV'],
	},

	/**
	 * Database
	 */
	db: {
		url: process.env['DATABASE_URL'],
	},

	/**
	 * Cors origins
	 */

	cors: {
		origin: process.env['CORS_ORIGIN'],
	},

	/**
	 * Logger
	 */

	logFormat: process.env['LOG_FORMAT'],
	logLevel: process.env['LOG_LEVEL'],

	/**
	 * Swagger
	 */

	swagger: {
		enabled: process.env['SWAGGER_ENABLED'],
		path: process.env['SWAGGER_PATH'],
	},

	/**
	 * Rate limit
	 */

	rateLimit: {
		windowMs: Number(process.env['RATE_LIMIT_WINDOW_MS']),
		max: Number(process.env['RATE_LIMIT_MAX']),
	},

	/**
	 * Security
	 */
	security: {
		contentSecurityPolicy: process.env['CONTENT_SECURITY_POLICY'],
	},
};
