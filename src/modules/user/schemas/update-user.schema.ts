import z from 'zod';
import {
	validateOptionalEmail,
	validateOptionalString,
	validateOptionalStringArray,
} from '@/validators';

/**
 * Update user schema
 */
export const updateUserSchema = z.object({
	name: validateOptionalString('Name'),
	email: validateOptionalEmail('Email'),
	department: validateOptionalString('Department'),
	skills: validateOptionalStringArray('Skills'),
});

/**
 * Update user schema type
 */
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
