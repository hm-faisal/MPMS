import config from 'config';
import type { NextFunction, Request, Response } from 'express';
import { logger } from '@/config';
/**
 * @param {Error & { code?: number }} error
 * @param {Request} req
 * @param {Response} res
 * @return void
 */

export const errorHandler = (
	error: Error & { code?: number },
	req: Request,
	res: Response,
	_next: NextFunction,
) => {
	let code = error.code || 500;
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
			stack:
				config.get('server.env') === 'development' ? error.stack : undefined,
		},
	};

	logger.error('Error occurred in ', req.originalUrl, errorLog);

	if (error instanceof Error) {
		errorDetails = error;
		message = error.message;
		code = error.code || 500;
	}

	// Prevent sensitive information leakage
	const response = {
		code,
		success: false,
		message,
		...(errorDetails && { errorDetails }),
		...(config.get('server.env') === 'development' && {
			timestamp: new Date().toISOString(),
			url: req.originalUrl,
		}),
	};

	res.status(code).json(response);
};
