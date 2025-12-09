import config from 'config';
import type { CookieOptions } from 'express';

export const cookieOptions: CookieOptions = {
	httpOnly: true,
	secure: config.get('server.env') === 'production',
	sameSite: 'lax',
	maxAge: config.get('jwt.accessTokenExpiresIn'),
};
