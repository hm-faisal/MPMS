import { BadRequestError, UnauthorizedError } from '@/errors';
import type { IUser } from '@/types';
import { catchAsync } from '@/utils/catch-async';
import type { AccessTPayload } from '@/utils/jwt-helper';
import { sendResponse } from '@/utils/send-response';
import { changePasswordSchema } from './schemas/change-password.schema';
import { updateUserSchema } from './schemas/update-user.schema';
import {
	getAllUsers,
	getUserProfile,
	updatePassword,
	updateUserProfile,
} from './user.service';

const getProfile = catchAsync(async (req, res) => {
	const { userId } = req.user as AccessTPayload;
	if (!userId) {
		throw new UnauthorizedError();
	}
	const user = await getUserProfile(userId);

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
	const user = await getUserProfile(id);

	sendResponse(res, {
		code: 200,
		message: 'User retrieved successfully',
		success: true,
		data: user,
	});
});

const getUsers = catchAsync(async (_req, res) => {
	const users = await getAllUsers();

	sendResponse(res, {
		code: 200,
		message: 'Users retrieved successfully',
		success: true,
		data: users,
	});
});

const updateUser = catchAsync(async (req, res) => {
	const parsedData = updateUserSchema.parse(req.body);
	const { userId } = req.user as AccessTPayload;
	if (!userId) {
		throw new UnauthorizedError();
	}
	const user = await updateUserProfile(userId, parsedData as Partial<IUser>);

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
	const user = await updatePassword(userId, parsedData);

	sendResponse(res, {
		code: 200,
		message: 'User updated successfully',
		success: true,
		data: user,
	});
});

export const userController = {
	getProfile,
	getUserById,
	getUsers,
	updateUser,
	changePassword,
};
