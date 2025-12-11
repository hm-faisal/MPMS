import z from 'zod';
import { validateDate, validateString } from '@/validators';

export const createSprintSchema = z.object({
	title: validateString('Title'),
	startDate: validateDate('Start date'),
	endDate: validateDate('End date'),
});

export type CreateSprintSchema = z.infer<typeof createSprintSchema>;
