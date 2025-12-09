import z from 'zod';

/**
 * Validate email
 * @param label string
 * @returns Zod schema for email validation
 */
export const validateEmail = (label: string) =>
	z.email({ message: `${label} is invalid` });

/**
 * Validate optional email
 * @param label string
 * @returns Zod schema for optional email validation
 */
export const validateOptionalEmail = (label: string) =>
	z.email({ message: `${label} is invalid` }).optional();
