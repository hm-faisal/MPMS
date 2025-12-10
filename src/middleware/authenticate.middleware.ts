import config from 'config';
import type { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '@/errors';
import { type AccessTPayload, verifyJwtToken } from '@/utils/jwt-helper';

export const isAuthenticated = (
	req: Request,
	_res: Response,
	next: NextFunction,
) => {
	try {
		const token = req.cookies['token'];
		if (!token) {
			return next(new UnauthorizedError());
		}

		const payload = verifyJwtToken(token, {
			secret: config.get<string>('jwt.accessTokenSecret'),
		}) as AccessTPayload;

		if (!payload || !payload.userId || !payload.role) {
			return next(new UnauthorizedError());
		}

		req.user = payload;
		return next();
	} catch (error) {
		return next(error);
	}
};
