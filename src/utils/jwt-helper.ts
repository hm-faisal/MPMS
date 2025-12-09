import config from 'config';
import type { SignOptions, VerifyOptions } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import { logger } from '@/config';
import type { UserRole } from '../constants';

export type AccessTPayload = {
	userId: string;
	role: UserRole;
	iat?: number;
	exp?: number;
};

type SignOptionsAndSecret = SignOptions & {
	secret: string;
};

const defaults: SignOptions = {
	algorithm: 'HS256',
};

export const accessTokenSignOptions: SignOptionsAndSecret = {
	expiresIn: config.get<string>('jwt.accessTokenExpiresIn') as NonNullable<
		SignOptions['expiresIn']
	>,
	secret: config.get<string>('jwt.accessTokenSecret'),
	...defaults,
};

// Enhanced JWT signing with security improvements
export const signJwtToken = (
	payload: AccessTPayload,
	options?: SignOptionsAndSecret,
) => {
	try {
		const { secret, ...options_ } = options || accessTokenSignOptions;

		// Validate payload structure
		if (!payload || typeof payload !== 'object') {
			throw new Error('Invalid payload provided');
		}

		// Add timestamp for additional security
		const enhancedPayload = {
			...payload,
			iat: Math.floor(Date.now() / 1000),
		};

		return jwt.sign(enhancedPayload, secret, {
			...defaults,
			...options_,
		});
	} catch (error) {
		logger.error('JWT signing error:', error);
		throw new Error('Failed to generate token');
	}
};

// Enhanced JWT verification with comprehensive error handling
export const verifyJwtToken = <TPayload extends object = AccessTPayload>(
	token: string,
	options?: VerifyOptions & { secret: string },
) => {
	try {
		if (!token || typeof token !== 'string') {
			throw new Error('Invalid token provided');
		}

		const {
			secret = config.get<string>('jwt.accessTokenSecret'),
			...options_
		} = options || {};

		if (!secret) {
			throw new Error('JWT secret not configured');
		}

		const payload = jwt.verify(token, secret, {
			algorithms: [defaults.algorithm as jwt.Algorithm],
			...options_,
		}) as unknown as TPayload;

		// Validate payload structure
		if (!payload || typeof payload !== 'object') {
			throw new Error('Invalid token payload');
		}

		return payload;
	} catch (error: unknown) {
		if (error instanceof jwt.JsonWebTokenError) {
			logger.error('JWT verification failed:', error.message);
			return {
				error: 'Invalid token',
				details: error.message,
			};
		} else if (error instanceof jwt.TokenExpiredError) {
			logger.error('JWT token expired:', error.message);
			return {
				error: 'Token expired',
				details: error.message,
			};
		} else if (error instanceof jwt.NotBeforeError) {
			logger.error('JWT token not active:', error.message);
			return {
				error: 'Token not active',
				details: error.message,
			};
		} else {
			logger.error('JWT verification error:', error);
			return {
				error: 'Token verification failed',
				details: error instanceof Error ? error.message : 'Unknown error',
			};
		}
	}
};

// Token validation utility
export const validateToken = (token: string): boolean => {
	try {
		const result = verifyJwtToken(token);
		return !('error' in result);
	} catch {
		return false;
	}
};

// Extract token from authorization header
export const extractTokenFromHeader = (
	authHeader: string | undefined,
): string | null => {
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return null;
	}
	return authHeader.substring(7);
};
