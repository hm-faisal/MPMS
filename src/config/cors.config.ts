/**
 * CORS Configuration
 * Application-level CORS settings
 */

import config from 'config';
import type { CorsOptions } from 'cors';

/**
 * CORS configuration options
 * @type {CorsOptions}
 */
export const corsConfig: CorsOptions = {
	origin: config.get<string>('cors.origin').split(','),
	credentials: true,
	optionsSuccessStatus: 200,
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
	exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
	maxAge: 86400, // 24 hours
};
