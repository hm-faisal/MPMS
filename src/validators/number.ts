import z from 'zod';

/**
 * Validate number
 * @param { string } label - label for the field
 * @returns { ZodNumber } Zod schema for number validation
 */
export const validateNumber = (label: string): z.ZodNumber =>
	z
		.number({ error: `${label} is required` })
		.min(1, { message: `${label} cannot be empty` });

/**
 * validate optional number
 * @param { string } label - label for the field
 * @returns { ZodOptional<ZodNumber> } Zod schema for optional number validation
 */
export const validateOptionalNumber = (
	label: string,
): z.ZodOptional<z.ZodNumber> =>
	z.number({ error: `${label} is required` }).optional();
