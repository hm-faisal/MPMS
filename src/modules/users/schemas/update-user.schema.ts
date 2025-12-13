import z from 'zod';
import { UserRole } from '@/constants';
import {
	validateOptionalEmail,
	validateOptionalEnum,
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
	role: validateOptionalEnum('Role', UserRole),
});

export const updateUserProfileSchema = z.object({
	name: validateOptionalString('Name'),
	email: validateOptionalEmail('Email'),
	department: validateOptionalString('Department'),
	skills: validateOptionalStringArray('Skills'),
});

/**
 * Update user schema type
 */
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
export type UpdateUserProfileSchema = z.infer<typeof updateUserProfileSchema>;
