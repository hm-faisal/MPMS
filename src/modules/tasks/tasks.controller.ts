import { BadRequestError } from '@/errors';
import { catchAsync } from '@/utils/catch-async';
import { sendResponse } from '@/utils/send-response';
import { updateTaskSchema } from './schemas';
import { taskService } from './tasks.service';

const getTaskById = catchAsync(async (req, res) => {
	const id = req.params['id'];
	if (!id) {
		throw new BadRequestError('Sprint id is required');
	}

	const task = await taskService.getTaskById(id);

	sendResponse(res, {
		code: 200,
		message: 'Task fetched successfully',
		data: task,
	});
});

const getTasks = catchAsync(async (_req, res) => {
	const tasks = await taskService.getTasks();

	return sendResponse(res, {
		code: 200,
		message: 'Tasks fetched successfully',
		data: tasks,
	});
});

const updateTaskById = catchAsync(async (req, res) => {
	const id = req.params['id'];
	const parsedData = updateTaskSchema.parse(req.body);

	if (!id) {
		throw new BadRequestError('Task id is required');
	}

	const task = await taskService.updateTaskById(id, parsedData);

	return sendResponse(res, {
		code: 200,
		message: 'Task updated successfully',
		data: task,
	});
});

export const taskController = { getTaskById, getTasks, updateTaskById };
