import config from 'config';
import type { CookieOptions } from 'express';

/**
 * Cookie configuration for JWT tokens
 *
 * For cross-origin setups (e.g., Vercel frontend + Render backend):
 * - sameSite: 'none' - Required for cross-origin cookie sharing
 * - secure: true - Required when sameSite is 'none' (HTTPS only)
 * - httpOnly: true - Prevents client-side JavaScript access
 * - domain: undefined - Do NOT set domain for cross-origin cookies
 *
 * Note: Frontend must use withCredentials: true in requests
 */
export const cookieOptions: CookieOptions = {
	httpOnly: true,
	secure: true, // REQUIRED on Render
	sameSite: 'none', // REQUIRED cross-origin
	maxAge: 24 * 60 * 60 * 1000,
	path: '/',
};
