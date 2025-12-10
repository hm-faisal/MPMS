import {
	InternalServerError,
	NotFoundError,
	UnauthorizedError,
} from '@/errors';
import { User } from '@/models/User';
import type { IUser } from '@/types';
import { compareService, hashService } from '@/utils/bcrypt';
import type { ChangePasswordSchema } from './schemas/change-password.schema';

/**
 * Create a new user
 * @param user User data
 * @returns New user Promise
 */
export const createUser = (user: IUser) => {
	const newUser = new User(user);
	return newUser.save();
};

/**
 * Find user by email
 * @param email User email
 * @returns boolean Promise
 */
export const findUserByEmail = (email: string) => {
	return User.findOne({ email });
};

/**
 * Find user by id
 * @param id User id
 * @returns boolean Promise
 */
export const findUserById = async (id: string) => {
	const isExist = await User.findById(id);
	return !!isExist;
};

/**
 * Get user profile
 * @param id User id
 * @returns User profile Promise
 */
export const getUserProfile = async (id: string) => {
	const user = await User.findOne({
		_id: id,
	}).select('-password');

	if (!user) {
		throw new NotFoundError('User not found');
	}

	return user;
};

/**
 * Get all users
 * @returns Users Promise
 */
// TODO: Add pagination
export const getAllUsers = () => {
	return User.find().select('-password');
};

/**
 * Update authenticated user
 * @param id User id
 * @param user User data
 * @returns User profile Promise
 */
export const updateUserProfile = async (id: string, user: Partial<IUser>) => {
	const isExist = await User.findById(id);
	if (!isExist) {
		throw new NotFoundError('User not found');
	}

	const updatedUser = await User.findOneAndUpdate(
		{
			_id: id,
		},
		user,
		{ new: true },
	).select('-password');

	if (!updatedUser) {
		throw new InternalServerError('Failed to update user profile');
	}

	return updatedUser;
};

export const updatePassword = async (
	id: string,
	payload: ChangePasswordSchema,
) => {
	const isExist = await User.findById(id);
	if (!isExist) {
		throw new NotFoundError('User not found');
	}

	const { oldPassword, newPassword } = payload;

	const isMatched = await compareService(oldPassword, isExist.password);

	if (!isMatched) {
		throw new UnauthorizedError('Invalid old password');
	}

	const password = await hashService(newPassword);

	const updatedUser = await User.findOneAndUpdate(
		{
			_id: id,
		},
		{ password },
		{ new: true },
	).select('-password');

	if (!updatedUser) {
		throw new InternalServerError('Failed to update user profile');
	}

	return updatedUser;
};
