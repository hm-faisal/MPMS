import { UserRole } from '@/constants';
import { BadRequestError, ConflictError } from '@/errors';
import { compareService, hashService } from '@/utils/bcrypt';
import { signJwtToken } from '@/utils/jwt-helper';
import { createUser, findUserByEmail } from '../users/users.service';
import type { LoginSchema } from './schemas/login.schema';
import type { RegisterSchema } from './schemas/register.schema';

/**
 * Register service
 * @param user IUser
 * @returns Promise<IUser>
 */

const register = async (user: RegisterSchema) => {
	const isExist = await findUserByEmail(user.email);

	if (isExist) {
		throw new ConflictError('User already exist');
	}

	const hashedPassword = await hashService(user.password);

	const newUser = await createUser({
		...user,
		password: hashedPassword,
		role: UserRole.MEMBER,
	});

	const tokenValue = signJwtToken({
		userId: newUser._id.toString(),
		role: newUser.role,
	});
	return { user, tokenValue };
};

const login = async (payload: LoginSchema) => {
	const { email, password } = payload;

	const user = await findUserByEmail(email);

	if (!user) {
		throw new BadRequestError('Invalid credentials');
	}

	const isPasswordMatched = await compareService(password, user.password);

	if (!isPasswordMatched) {
		throw new BadRequestError('Invalid credentials');
	}

	const tokenValue = signJwtToken({
		userId: user._id.toString(),
		role: user.role,
	});

	return { tokenValue };
};

export const authService = {
	register,
	login,
};
