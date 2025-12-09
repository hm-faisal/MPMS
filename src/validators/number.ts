import z from 'zod';

/**
 * Validate number
 * @param label string
 * @returns Zod schema for number validation
 */
export const validateNumber = (label: string) =>
	z
		.number({ error: `${label} is required` })
		.min(1, { message: `${label} cannot be empty` });

/**
 * validate optional number
 * @param label string
 * @returns Zod schema for optional number validation
 */
export const validateOptionalNumber = (label: string) =>
	z
		.number()
		.min(1, { message: `${label} cannot be empty` })
		.optional();
