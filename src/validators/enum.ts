import z from 'zod';

/**
 * Creates a Zod enum validator with a custom error message
 * @template T - TypeScript enum type
 * @param {string} label - Label to use in the error message
 * @param {T} enumType - TypeScript enum object
 * @returns {z.ZodEnum<[string, ...string[]]>} Zod enum schema with custom error message
 * @example
 * enum UserRole { Admin = 'admin', User = 'user' }
 * const roleSchema = validateEnum('User role', UserRole);
 */
export const validateEnum = <T extends Record<string, string | number>>(
	label: string,
	enumType: T,
) => {
	const enumValues = Object.values(enumType) as [string, ...string[]];
	return z
		.enum(enumValues, {
			message: `${label} is required`,
		})
		.transform((val) => val as T[keyof T]);
};

/**
 * Creates a Zod optional enum validator with a custom error message
 * @template T - TypeScript enum type
 * @param {string} label - Label to use in the error message
 * @param {T} enumType - TypeScript enum object
 * @returns {z.ZodOptional<z.ZodEnum<[string, ...string[]]>>} Zod optional enum schema with custom error message
 * @example
 * enum UserRole { Admin = 'admin', User = 'user' }
 * const roleSchema = validateOptionalEnum('User role', UserRole);
 */
export const validateOptionalEnum = <T extends Record<string, string | number>>(
	label: string,
	enumType: T,
) => {
	const enumValues = Object.values(enumType) as [string, ...string[]];
	return z
		.enum(enumValues, {
			message: `${label} is required`,
		})
		.transform((val) => val as T[keyof T])
		.optional();
};
