/**
 * CORS Configuration
 * Application-level CORS settings
 *
 * For cross-origin setups (e.g., Vercel frontend + Render.io backend):
 * - credentials: true - Required for cookie-based authentication
 * - origin: Must include exact frontend URL(s)
 * - allowedHeaders: Must include 'Cookie' and standard headers
 */

import config from 'config';
import type { CorsOptions } from 'cors';

/**
 * CORS configuration options
 * @type {CorsOptions}
 */
export const corsConfig: CorsOptions = {
	origin: config.get<string>('cors.origin').split(','),
	credentials: true, // Required for cookies
	optionsSuccessStatus: 200,
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
	allowedHeaders: [
		'Content-Type',
		'Authorization',
		'X-Requested-With',
		'Cookie', // Required for cookie-based auth
	],
	exposedHeaders: ['X-Total-Count', 'X-Page-Count', 'Set-Cookie'],
	maxAge: 86400, // 24 hours
};
