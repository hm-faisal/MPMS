import { BadRequestError } from '@/errors';
import { catchAsync } from '@/utils/catch-async';
import { sendResponse } from '@/utils/send-response';
import { createTaskSchema } from '../tasks/schemas';
import { updateSprintSchema } from './schemas';
import { sprintService } from './sprints.service';

const getSprintsStats = catchAsync(async () => {});

/**
 * Get sprint by id
 * @route GET /api/v1/sprints/:id
 * @requires { string } params.id - Sprint ID
 * @access Private
 */
const getSprintById = catchAsync(async (req, res) => {
	const id = req.params['id'];
	if (!id) {
		throw new BadRequestError('Sprint id is required');
	}

	const sprint = await sprintService.getSprintById(id);

	return sendResponse(res, {
		code: 200,
		message: 'Sprint fetched successfully',
		data: sprint,
	});
});

/**
 * Get all sprints
 * @route GET /api/v1/sprints
 * @access Private
 */
const getSprints = catchAsync(async (_req, res) => {
	const sprints = await sprintService.getSprints();

	return sendResponse(res, {
		code: 200,
		message: 'Sprints fetched successfully',
		data: sprints,
	});
});

/**
 * Update sprint
 * @route PATCH /api/v1/sprints/:id
 * @requires { string } params.id - Sprint ID
 * @requires { SprintType } body - Sprint data
 * @access Private
 */
const updateSprintById = catchAsync(async (req, res) => {
	const id = req.params['id'];
	if (!id) {
		throw new BadRequestError('Sprint id is required');
	}
	const parsedData = updateSprintSchema.parse(req.body);

	const sprint = await sprintService.updateSprintById(id, parsedData);

	return sendResponse(res, {
		code: 200,
		message: 'Sprint updated successfully',
		data: sprint,
	});
});

const deleteSprint = catchAsync(async (req, res) => {
	const id = req.params['id'];
	if (!id) {
		throw new BadRequestError('Sprint id is required');
	}

	await sprintService.deleteSprintById(id);
	sendResponse(res, {
		code: 204,
		message: 'Sprint deleted successfully',
		data: null,
	});
});

/**
 * Create task under sprint
 * @route POST /api/v1/sprints/:id/tasks
 * @requires { string } params.id - Sprint ID
 * @requires { CreateTaskSchemaType } body - Task data
 * @access Private
 */
const createTask = catchAsync(async (req, res) => {
	const id = req.params['id'];
	if (!id) {
		throw new BadRequestError('Sprint id is required');
	}
	const parsedData = createTaskSchema.parse(req.body);
	const result = await sprintService.createTask(id, parsedData);

	return sendResponse(res, {
		code: 201,
		message: 'Task created successfully',
		data: result,
	});
});

/**
 * Get tasks under sprint
 * @route GET /api/v1/sprints/:id/tasks
 * @requires { string } params.id - Sprint ID
 * @access Private
 */
const getSprintTasks = catchAsync(async (req, res) => {
	const id = req.params['id'];
	if (!id) {
		throw new BadRequestError('Sprint id is required');
	}

	const tasks = await sprintService.getSprintTasks(id);

	return sendResponse(res, {
		code: 200,
		message: 'Sprint tasks fetched successfully',
		data: tasks,
	});
});

export const sprintController = {
	getSprintsStats,
	getSprints,
	getSprintById,
	updateSprintById,
	deleteSprint,
	createTask,
	getSprintTasks,
};
