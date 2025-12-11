import z from 'zod';
import { ProjectStatus } from '@/constants';
import {
	validateDate,
	validateOptionalEnum,
	validateOptionalNumber,
	validateOptionalString,
	validateOptionalUrl,
	validateString,
} from '@/validators';

export const createProjectSchema = z.object({
	title: validateString('Title'),
	client: validateString('Client'),
	description: validateOptionalString('Description'),
	startDate: validateDate('Start Date'),
	endDate: validateDate('End Date'),
	budget: validateOptionalNumber('Budget'),
	status: validateOptionalEnum('Status', ProjectStatus),
	thumbnail: validateOptionalUrl('Thumbnail'),
});

export type CreateProjectSchema = z.infer<typeof createProjectSchema>;
