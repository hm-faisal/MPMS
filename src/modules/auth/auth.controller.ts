import { catchAsync } from '@/utils/catch-async';
import { sendResponseWithCookie } from '@/utils/send-response';
import { authService } from './auth.service';
import { loginSchema } from './schemas/login.schema';
import { registerSchema } from './schemas/register.schema';

const register = catchAsync(async (req, res) => {
	const parsedData = registerSchema.parse(req.body);
	const { user, tokenValue } = await authService.register(parsedData);

	sendResponseWithCookie(
		res,
		{
			code: 201,
			message: 'User created successfully',
			data: user,
			links: {
				self: '/auth/register',
				profile: 'users/profile',
			},
		},
		tokenValue,
	);
});

const login = catchAsync(async (req, res) => {
	const parsedData = loginSchema.parse(req.body);
	const { tokenValue } = await authService.login(parsedData);

	sendResponseWithCookie(
		res,
		{
			code: 200,
			message: 'User logged in successfully',
			data: null,
			links: {
				self: '/auth/login',
				profile: 'users/profile',
			},
		},
		tokenValue,
	);
});

const logout = catchAsync(async (_req, res) => {
	res.clearCookie('token');
	res.status(204).json({
		code: 204,
		message: 'User logged out successfully',
		data: null,
		links: {
			self: '/auth/logout',
		},
	});
});

export const authController = {
	register,
	login,
	logout,
};
