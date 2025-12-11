import type { NextFunction, Request, RequestHandler, Response } from 'express';
import { logger } from '@/config';

/**
 * Wrapper to catch async errors with timeout
 * @param {RequestHandler} fn - Express request handler
 * @param {number} timeoutMs - Timeout in milliseconds (default: 30000)
 * @returns {RequestHandler} Express middleware function
 */
export const catchAsync = (fn: RequestHandler, timeoutMs: number = 30000) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			// Create a promise that rejects after timeout
			const timeoutPromise = new Promise((_, reject) => {
				setTimeout(() => {
					reject(new Error('Request timeout'));
				}, timeoutMs);
			});

			// Race between the function execution and timeout
			await Promise.race([Promise.resolve(fn(req, res, next)), timeoutPromise]);
		} catch (error) {
			// Enhanced error logging
			logger.error('Async request error:', {
				url: req.originalUrl,
				method: req.method,
				ip: req.ip,
				error: error instanceof Error ? error.message : 'Unknown error',
				stack: error instanceof Error ? error.stack : undefined,
			});

			// Pass ALL errors to the global error handler without modification
			// The global error handler will determine the proper status code and response
			next(error);
		}
	};
};

/**
 * Wrapper to catch async errors with timeout
 * @param {RequestHandler} fn - Express request handler
 * @param {number} timeoutMs - Timeout in milliseconds
 * @returns {RequestHandler} Express middleware function
 */
export const catchAsyncWithTimeout = (
	fn: RequestHandler,
	timeoutMs: number,
) => {
	return catchAsync(fn, timeoutMs);
};

/**
 * Wrapper to catch async errors with timeout for database operations
 * @param {RequestHandler} fn - Express request handler
 * @returns {RequestHandler} Express middleware function
 */
export const catchAsyncDB = (fn: RequestHandler) => {
	return catchAsync(fn, 10000); // 10 second timeout for DB operations
};

/**
 * Wrapper to catch async errors with timeout for file upload operations
 * @param {RequestHandler} fn - Express request handler
 * @returns {RequestHandler} Express middleware function
 */
export const catchAsyncUpload = (fn: RequestHandler) => {
	return catchAsync(fn, 60000); // 60 second timeout for uploads
};

/**
 * Wrapper to catch async errors with timeout for authentication operations
 * @param {RequestHandler} fn - Express request handler
 * @returns {RequestHandler} Express middleware function
 */
export const catchAsyncAuth = (fn: RequestHandler) => {
	return catchAsync(fn, 5000); // 5 second timeout for auth operations
};
