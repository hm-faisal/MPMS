/**
 * Rate Limiting Configuration
 * API rate limiting settings
 */

import config from 'config';

/**
 * Rate limit configuration
 */
export const rateLimitConfig = {
	windowMs: config.get<number>('rateLimit.windowMs'),
	max: config.get<number>('rateLimit.max'),
	message: 'Too many requests from this IP, please try again later.',
	standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
	legacyHeaders: false, // Disable `X-RateLimit-*` headers
	skipSuccessfulRequests: false,
	skipFailedRequests: false,
};

export default rateLimitConfig;
