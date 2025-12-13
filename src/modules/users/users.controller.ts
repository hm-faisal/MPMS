import { BadRequestError, UnauthorizedError } from '@/errors';
import type { UserType } from '@/models/User';
import { catchAsync } from '@/utils/catch-async';
import type { AccessTPayload } from '@/utils/jwt-helper';
import { sendResponse } from '@/utils/send-response';
import { changePasswordSchema } from './schemas/change-password.schema';
import {
	updateUserProfileSchema,
	updateUserSchema,
} from './schemas/update-user.schema';
import { userService } from './users.service';

const getProfile = catchAsync(async (req, res) => {
	const { userId } = req.user as AccessTPayload;
	if (!userId) {
		throw new UnauthorizedError();
	}
	const user = await userService.getUserProfile(userId);

	sendResponse(res, {
		code: 200,
		message: 'User profile retrieved successfully',
		success: true,
		data: user,
	});
});

const getUserById = catchAsync(async (req, res) => {
	const { id } = req.params;
	if (!id) {
		throw new BadRequestError('User ID is required');
	}
	const user = await userService.getUserProfile(id);

	sendResponse(res, {
		code: 200,
		message: 'User retrieved successfully',
		success: true,
		data: user,
	});
});

const getUsers = catchAsync(async (_req, res) => {
	const users = await userService.getAllUsers();

	sendResponse(res, {
		code: 200,
		message: 'Users retrieved successfully',
		success: true,
		data: users,
	});
});

const updateUser = catchAsync(async (req, res) => {
	const userId = req.params['id'];
	const parsedData = updateUserSchema.parse(req.body);
	if (!userId) {
		throw new UnauthorizedError();
	}
	const user = await userService.updateUserProfile(
		userId,
		parsedData as Partial<UserType>,
	);

	sendResponse(res, {
		code: 200,
		message: 'User updated successfully',
		success: true,
		data: user,
	});
});

const updateUserProfile = catchAsync(async (req, res) => {
	const parsedData = updateUserProfileSchema.parse(req.body);
	const { userId } = req.user as AccessTPayload;
	if (!userId) {
		throw new UnauthorizedError();
	}
	const user = await userService.updateUserProfile(
		userId,
		parsedData as Partial<UserType>,
	);

	sendResponse(res, {
		code: 200,
		message: 'User updated successfully',
		success: true,
		data: user,
	});
});

const changePassword = catchAsync(async (req, res) => {
	const parsedData = changePasswordSchema.parse(req.body);
	const { userId } = req.user as AccessTPayload;
	if (!userId) {
		throw new UnauthorizedError();
	}
	const user = await userService.updatePassword(userId, parsedData);

	sendResponse(res, {
		code: 200,
		message: 'User updated successfully',
		success: true,
		data: user,
	});
});

const deleteUser = catchAsync(async (req, res) => {
	const { id } = req.params;
	if (!id) {
		throw new BadRequestError('User ID is required');
	}

	await userService.deleteUser(id);

	sendResponse(res, {
		code: 204,
		message: 'User deleted successfully',
		success: true,
		data: null,
	});
});

export const userController = {
	getProfile,
	getUserById,
	getUsers,
	updateUser,
	updateUserProfile,
	changePassword,
	deleteUser,
};
