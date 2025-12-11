import config from 'config';
import type {
	ErrorRequestHandler,
	NextFunction,
	Request,
	Response,
} from 'express';
import { ZodError } from 'zod';
import { logger } from '@/config';

/**
 * Mongoose CastError type
 * @interface MongooseCastError
 * @extends {Error}
 */
interface MongooseCastError extends Error {
	name: 'CastError';
	path: string;
}

/**
 * Mongoose ValidationError type
 * @interface MongooseValidationError
 * @extends {Error}
 */
interface MongooseValidationError extends Error {
	name: 'ValidationError';
	errors: Record<string, { path: string; message: string }>;
}

/**
 * Mongoose Duplicate Key Error
 * @interface MongooseDuplicateKeyError
 * @extends {Error}
 */
interface MongooseDuplicateKeyError extends Error {
	code: 11000;
	keyValue?: Record<string, unknown>;
}

/**
 * JWT Error types
 * @interface JWTError
 * @extends {Error}
 */
interface JWTError extends Error {
	name: 'JsonWebTokenError' | 'TokenExpiredError';
}

/**
 * Type guard to check if error is a Mongoose CastError
 * @param {Error} error - The error to check
 * @returns {error is MongooseCastError}
 */
function isMongooseCastError(error: Error): error is MongooseCastError {
	return error.name === 'CastError' && 'path' in error;
}

/**
 * Type guard to check if error is a Mongoose ValidationError
 * @param {Error} error - The error to check
 * @returns {error is MongooseValidationError}
 */
function isMongooseValidationError(
	error: Error,
): error is MongooseValidationError {
	return error.name === 'ValidationError' && 'errors' in error;
}

/**
 * Type guard to check if error is a Mongoose Duplicate Key Error
 * @param {Error} error - The error to check
 * @returns {error is MongooseDuplicateKeyError}
 */
function isMongooseDuplicateKeyError(
	error: Error,
): error is MongooseDuplicateKeyError {
	return (error as MongooseDuplicateKeyError).code === 11000;
}

/**
 * Type guard to check if error is a JWT Error
 * @param {Error} error - The error to check
 * @returns {error is JWTError}
 */
function isJWTError(error: Error): error is JWTError {
	return (
		error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError'
	);
}

/**
 * Global Express Error Handler
 * Handles various error types including Zod validation, Mongoose errors, JWT errors, and generic errors
 * @param {Error} error - The error object
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} _next - Express next function (unused)
 * @returns {void}
 */
const globalErrorHandler: ErrorRequestHandler = (
	error: Error,
	req: Request,
	res: Response,
	_next: NextFunction,
) => {
	let code = 500;
	let message = 'Internal Server Error';
	let errorDetails: Record<string, unknown>[] | null = null;

	// Logging
	const errorLog = {
		timestamp: new Date().toISOString(),
		method: req.method,
		url: req.originalUrl,
		ip: req.ip,
		userAgent: req.get('User-Agent'),
		error: {
			name: error.name,
			message: error.message,
			stack:
				config.get('server.env') === 'development'
					? (error as Error).stack
					: undefined,
		},
	};

	if (config.get('server.env') === 'production') {
		logger.error('🚨 Production Error:', JSON.stringify(errorLog));
	} else {
		logger.error('🚨 Development Error:', errorLog);
	}

	// ----------------- Error Handling -----------------
	if (error instanceof ZodError) {
		code = 400;
		message = 'Validation failed';
		errorDetails = error.issues.map((issue) => ({
			field: issue.path.join('.') || 'unknown',
			message: issue.message,
			code: issue.code,
		}));
	} else if (
		error.name === 'BadRequestError' ||
		(error as { code?: number }).code === 400
	) {
		code = 400;
		// Don't use error.message if it contains the stringified ZodError
		message = error.message.startsWith('[') ? 'Bad request' : error.message;
	} else if (isMongooseDuplicateKeyError(error)) {
		code = 409;
		const field = Object.keys(error.keyValue ?? {})[0];
		message = `${field} already exists`;
	} else if (isMongooseCastError(error)) {
		code = 400;
		message = `Invalid ${error.path}`;
	} else if (isMongooseValidationError(error)) {
		code = 400;
		message = 'Validation failed';
		errorDetails = Object.values(error.errors).map((err) => ({
			field: err.path,
			message: err.message,
		}));
	} else if (isJWTError(error)) {
		code = 401;
		message =
			error.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid token';
	} else if ((error as { code?: number }).code === 403) {
		code = 403;
		message = 'Access denied';
	} else {
		code = 500;
		message =
			config.get('server.env') === 'production'
				? 'Something went wrong'
				: error.message;

		if (config.get('server.env') === 'development') {
			errorDetails = [
				{
					name: error.name,
					message: error.message,
					stack: (error as Error).stack,
				},
			];
		}
	}

	// ----------------- Response -----------------
	res.status(code).json({
		code,
		success: false,
		message,
		...(errorDetails && { errorDetails }),
		...(config.get('server.env') === 'development' && {
			timestamp: new Date().toISOString(),
			path: req.originalUrl,
		}),
	});
};

export const errorHandler = globalErrorHandler;
