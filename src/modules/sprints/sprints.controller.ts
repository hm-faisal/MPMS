import { BadRequestError } from '@/errors';
import { catchAsync } from '@/utils/catch-async';
import { sendResponse } from '@/utils/send-response';
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

export const sprintController = {
	getSprintsStats,
	getSprintById,
	updateSprintById,
	deleteSprint,
};
