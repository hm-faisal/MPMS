import config from 'config';
import type { CookieOptions } from 'express';

export const cookieOptions: CookieOptions = {
	httpOnly: true,
	secure: config.get('server.env') === 'production',
	sameSite: 'none',
	maxAge: config.get<number>('jwt.accessTokenExpiresIn') * 1000,
};
