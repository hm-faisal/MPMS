import config from 'config';
import type { CookieOptions } from 'express';

export const cookieOptions: CookieOptions = {
	httpOnly: true,
	secure: config.get('server.env') === 'production',
	sameSite: 'none',
	domain: config.get<string>('server.url'),
	maxAge: config.get<number>('jwt.accessTokenExpiresIn') * 1000,
};
