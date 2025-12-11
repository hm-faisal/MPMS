import type { ZodObject } from 'zod';
import { catchAsync } from '../utils/catch-async';

/**
 * Middleware to validate request body using Zod schema
 * @param schema - Zod schema to validate against
 */
export const validateRequest = <T extends ZodObject>(schema: T) => {
	return catchAsync(async (req, _res, next) => {
		req.body = await schema.parseAsync(req.body);
		next();
	});
};
