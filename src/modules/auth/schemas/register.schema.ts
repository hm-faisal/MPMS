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
	email: validateEmail('Email'),
	password: validatePassword('Password'),
	department: validateString('Department'),
	skills: validateStringArray('Skills'),
});

/**
 * Register schema type
 */
export type RegisterSchema = z.infer<typeof registerSchema>;
