import z from 'zod';

/**
 * Validate string
 * @param label string
 * @returns Zod schema for string validation
 */
export const validateString = (label: string) =>
	z
		.string({ error: `${label} is required` })
		.min(1, { message: `${label} cannot be empty` });

/**
 * Validate optional string
 * @param label string
 * @returns Zod schema for optional string validation
 */
export const validateOptionalString = (label: string) =>
	z
		.string()
		.min(1, { message: `${label} cannot be empty` })
		.optional();

/**
 * Validate string array
 * @param label string
 * @returns Zod schema for string array validation
 */
export const validateStringArray = (label: string) =>
	z
		.array(
			z
				.string({ error: `${label} must be a string` })
				.min(1, { message: `${label} cannot contain empty strings` }),
			{ error: `${label} must be an array of strings` },
		)
		.min(1, { message: `${label} must contain at least one item` });

/**
 * Validate optional string array
 * @param label string
 * @returns Zod schema for optional string array validation
 */
export const validateOptionalStringArray = (label: string) =>
	z
		.array(
			z
				.string({ error: `${label} must be a string` })
				.min(1, { message: `${label} cannot contain empty strings` }),
			{ error: `${label} must be an array of strings` },
		)
		.min(1, { message: `${label} must contain at least one item` })
		.optional();
