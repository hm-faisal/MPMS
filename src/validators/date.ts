import z from 'zod';

/**
 * Validate date
 * @param { string } label - label for the field
 * @returns { ZodDate } Zod schema for date validation
 */
export const validateDate = (label: string) =>
	z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
		message: `${label} must be a valid date`,
	});
/**
 * Validate optional date
 * @param { string } label - label for the field
 * @returns { ZodNullable<ZodDate> } Zod schema for optional date validation
 */
export const validateOptionalDate = (label: string) =>
	z
		.string()
		.refine((val) => !Number.isNaN(Date.parse(val)), {
			message: `${label} must be a valid date`,
		})
		.optional();
