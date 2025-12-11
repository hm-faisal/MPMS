import z from 'zod';
import { ProjectStatus } from '@/constants';
import {
	validateOptionalDate,
	validateOptionalEnum,
	validateOptionalNumber,
	validateOptionalString,
	validateOptionalUrl,
} from '@/validators';

export const updateProjectSchema = z.object({
	title: validateOptionalString('Title'),
	client: validateOptionalString('Client'),
	description: validateOptionalString('Description'),
	startDate: validateOptionalDate('Start Date'),
	endDate: validateOptionalDate('End Date'),
	budget: validateOptionalNumber('Budget'),
	status: validateOptionalEnum('Status', ProjectStatus),
	thumbnail: validateOptionalUrl('Thumbnail'),
});

export type UpdateProjectSchema = z.infer<typeof updateProjectSchema>;
