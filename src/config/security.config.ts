/**
 * Security Headers Configuration
 * Helmet middleware settings
 */

import config from 'config';

/**
 * Helmet security configuration
 */
export const securityConfig = {
	contentSecurityPolicy: config.get<boolean>('security.contentSecurityPolicy'),
	crossOriginEmbedderPolicy: false,
	crossOriginOpenerPolicy: false,
	crossOriginResourcePolicy: { policy: 'cross-origin' as const },
	dnsPrefetchControl: { allow: false },
	frameguard: { action: 'deny' as const },
	hidePoweredBy: true,
	hsts: {
		maxAge: 31536000, // 1 year
		includeSubDomains: true,
		preload: true,
	},
	ieNoOpen: true,
	noSniff: true,
	referrerPolicy: { policy: 'strict-origin-when-cross-origin' as const },
	xssFilter: true,
};

export default securityConfig;
