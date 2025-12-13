import z from 'zod';
import { validateEmail, validatePassword } from '@/validators';

/**
 * Login schema
 */
export const loginSchema = z.object({
	email: validateEmail('Email').toLowerCase(),
	password: validatePassword('Password'),
});

/**
 * Login schema type
 */
export type LoginSchema = z.infer<typeof loginSchema>;
