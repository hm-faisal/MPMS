import z from 'zod';

/**
 * Validate string
 * @param { string } label - label for the field
 * @returns { ZodString } Zod schema for string validation
 */
export const validateString = (label: string): z.ZodString =>
	z
		.string({ error: `${label} is required` })
		.min(1, { message: `${label} cannot be empty` });

/**
 * Validate optional nullable string
 * @param {string} label - label for the field
 * @returns {z.ZodOptional<z.ZodString>}
 */
export const validateOptionalString = (
	label: string,
): z.ZodOptional<z.ZodString> =>
	z
		.string()
		.min(1, { message: `${label} cannot be empty` })
		.optional();

/**
 * Validate string array
 * @param { string } label - label for the field
 * @returns { ZodArray<ZodString> } Zod schema for string array validation
 */
export const validateStringArray = (label: string): z.ZodArray<z.ZodString> =>
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
 * @param { string } label - label for the field
 * @returns { ZodNullable<ZodOptional<ZodArray<ZodString>>> } Zod schema for optional string array validation
 */
export const validateOptionalStringArray = (
	label: string,
): z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString>>> =>
	z
		.array(
			z
				.string({ error: `${label} must be a string` })
				.min(1, { message: `${label} cannot contain empty strings` }),
			{ error: `${label} must be an array of strings` },
		)
		.min(1, { message: `${label} must contain at least one item` })
		.optional()
		.nullable();
