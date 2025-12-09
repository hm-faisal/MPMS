import config from 'config';
import type { Request, Response } from 'express';
import { logger } from '@/config';
/**
 * @param {Error & { statusCode?: number }} error
 * @param {Request} req
 * @param {Response} res
 * @return void
 */

export const errorHandler = (error: Error & { statusCode?: number }, req: Request, res: Response) => {
	let statusCode = error.statusCode || 500;
	let message = error.message || 'Something went wrong';
	let errorDetails = null;

	const errorLog = {
		timestamp: new Date().toISOString(),
		method: req.method,
		url: req.originalUrl,
		ip: req.ip,
		userAgent: req.get('User-Agent'),
		path: req.path,
		error: {
			name: error.name,
			message: error.message,
			stack: config.get('NODE_ENV') === 'development' ? error.stack : undefined,
		},
	};

	logger.error('Error occurred in ', req.originalUrl, errorLog);

	if (error instanceof Error) {
		errorDetails = error;
		message = error.message;
		statusCode = error.statusCode || 500;
	}

	// Prevent sensitive information leakage
	const response = {
		statusCode,
		success: false,
		message,
		...(errorDetails && { errorDetails }),
		...(config.get('NODE_ENV') === 'development' && {
			timestamp: new Date().toISOString(),
			path: req.originalUrl,
		}),
	};

	res.status(statusCode).json(response);
};
