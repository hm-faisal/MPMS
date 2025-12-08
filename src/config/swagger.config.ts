/**
 * Swagger/OpenAPI Configuration
 * API documentation settings
 */

import config from 'config';

/**
 * Swagger configuration
 */
export const swaggerConfig = {
	enabled: config.get<boolean>('swagger.enabled'),
	path: config.get<string>('swagger.path'),
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'API Documentation',
			version: '1.0.0',
			description: 'REST API Documentation',
			contact: {
				name: 'API Support',
				email: 'support@example.com',
			},
		},
		servers: [
			{
				url: `http://${config.get('server.host')}:${config.get('server.port')}`,
				description: `${config.get('server.env')} server`,
			},
		],

		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
			},
		},
		security: [
			{
				bearerAuth: [],
			},
		],
	},
};

export default swaggerConfig;
