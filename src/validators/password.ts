import z from 'zod';

/**
 * Validate password
 * @param label - Label for the password field
 * @returns Zod schema for password validation
 */
export const validatePassword = (label: string = 'Password') =>
	z
		.string()
		.min(8, `${label} must be at least 8 characters long`)
		.max(32, `${label} must be at most 32 characters long`)
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,
		);
