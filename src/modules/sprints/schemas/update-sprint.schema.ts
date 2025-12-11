import z from 'zod';
import { validateOptionalString } from '@/validators';

export const updateSprintSchema = z.object({
	title: validateOptionalString('title'),
	startDate: validateOptionalString('startDate'),
	endDate: validateOptionalString('endDate'),
});

export type UpdateSprintSchemaType = z.infer<typeof updateSprintSchema>;
