import z from 'zod';

/**
 * Validate boolean
 * @param label string
 * @returns Zod schema for boolean validation
 */
export const validateBoolean = (label: string) =>
	z.boolean({ error: `${label} is required` });

/**
 * Validate optional boolean
 * @param label string
 * @returns Zod schema for optional boolean validation
 */
export const validateOptionalBoolean = (label: string) =>
	z.boolean({ error: `${label} is required` }).optional();
