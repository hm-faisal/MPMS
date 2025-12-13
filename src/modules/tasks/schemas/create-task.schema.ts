import { z } from 'zod';
import { TaskPriority, TaskStatus } from '@/constants';
import {
	validateDate,
	validateNumber,
	validateOptionalString,
	validateString,
	validateStringArray,
} from '@/validators';

export const createTaskSchema = z.object({
	title: validateString('Title'),
	description: validateOptionalString('Description'),
	assignees: validateStringArray('Assignees'),
	estimate: validateNumber('Estimate'),
	priority: z.enum(TaskPriority),
	status: z.enum(TaskStatus),
	dueDate: validateDate('Due Date'),
});

export type CreateTaskSchemaType = z.infer<typeof createTaskSchema>;
