import { cookieOptions } from '@/constants/cookie-options';
import { UnauthorizedError } from '@/errors';
import { catchAsync } from '@/utils/catch-async';
import type { AccessTPayload } from '@/utils/jwt-helper';
import { sendResponse, sendResponseWithCookie } from '@/utils/send-response';
import { authService } from './auth.service';
import { loginSchema } from './schemas/login.schema';
import { registerSchema } from './schemas/register.schema';

/**
 * Register controller
 * @param req Request object
 * @param res Response object
 * @returns Response with user data and token
 * @throws {ConflictError} If user already exists
 * @throws {BadRequestError} If validation fails
 */
const register = catchAsync(async (req, res) => {
	const parsedData = registerSchema.parse(req.body);
	const { user, tokenValue } = await authService.register(parsedData);

	sendResponseWithCookie(
		res,
		{
			code: 201,
			message: 'User created successfully',
			data: user,
		},
		tokenValue,
	);
});

/**
 * Login controller
 * @param req Request object
 * @param res Response object
 * @returns Response with token
 * @throws {BadRequestError} If validation fails or credentials are invalid
 */

const login = catchAsync(async (req, res) => {
	const parsedData = loginSchema.parse(req.body);
	const { tokenValue } = await authService.login(parsedData);

	sendResponseWithCookie(
		res,
		{
			code: 200,
			message: 'User logged in successfully',
			data: null,
		},
		tokenValue,
	);
});

/**
 * Logout controller
 * @param _req Request object
 * @param res Response object
 * @returns Response with status 204
 * @throws {UnauthorizedError} If user is not authenticated
 */

const logout = catchAsync(async (_req, res) => {
	res.clearCookie('token', cookieOptions);
	res.status(204).json({
		code: 204,
		message: 'User logged out successfully',
		data: null,
	});
});

/**
 * Get authenticated user profile
 * @param req Request object
 * @param res Response object
 * @returns Response with user profile data
 * @throws {UnauthorizedError} If user is not authenticated
 * @throws {NotFoundError} If user is not found
 * @throws {BadRequestError} If validation fails
 */

const getMe = catchAsync(async (req, res) => {
	const { userId } = req.user as AccessTPayload;
	if (!userId) {
		throw new UnauthorizedError();
	}

	const user = await authService.getMe(userId);
	sendResponse(res, {
		code: 200,
		message: 'User profile fetched successfully',
		data: user,
	});
});

export const authController = {
	register,
	login,
	logout,
	getMe,
};
