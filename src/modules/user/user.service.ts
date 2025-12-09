import { User } from '@/models/User';
import type { IUser } from '@/types';

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
