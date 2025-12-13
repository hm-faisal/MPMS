import z from 'zod';

/**
 * Validate URL
 * @param { string } label - label for the field
 * @returns { ZodURL } Zod schema for URL validation
 */

export const validateUrl = (label: string): z.ZodURL =>
	z.url({ error: `${label} must be a valid URL` });

/**
 * Validate Optional URL
 * @param { string } label - label for the field
 * @returns { ZodOptional<ZodURL> } Zod schema for optional URL validation
 */

export const validateOptionalUrl = (label: string) =>
	z
		.string()
		.optional()
		.refine(
			(val) => {
				// Allow undefined, null, or empty string
				if (!val) return true;
				// If present, must be valid URL AND start with https://
				try {
					new URL(val);
					return val.startsWith('https://');
				} catch {
					return false;
				}
			},
			{
				message: `${label} must be a valid HTTPS URL`,
			},
		);
