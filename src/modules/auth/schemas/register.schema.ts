import z from 'zod';
import {
	validateEmail,
	validatePassword,
	validateString,
	validateStringArray,
} from '@/validators';

/**
 * Register schema
 */
export const registerSchema = z.object({
	name: validateString('Name'),
	email: validateEmail('Email').toLowerCase(),
	password: validatePassword('Password'),
	department: validateString('Department'),
	skills: validateStringArray('Skills').transform((skills) =>
		skills.map((skill) => skill.toLowerCase()),
	),
});

/**
 * Register schema type
 */
export type RegisterSchema = z.infer<typeof registerSchema>;
