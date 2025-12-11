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

export const validateOptionalUrl = (label: string): z.ZodOptional<z.ZodURL> =>
	z.url({ error: `${label} must be a valid URL` }).optional();
