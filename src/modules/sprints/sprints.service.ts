import type { HydratedDocument } from 'mongoose';
import { logger } from '@/config';
import { BadRequestError, InternalServerError, NotFoundError } from '@/errors';
import { Project, type ProjectType } from '@/models/Project';
import { Sprint, type SprintType } from '@/models/Sprint';
import type { CreateTaskSchemaType } from '../tasks/schemas';
import { createTaskAndAttachToSprint } from '../tasks/tasks.service';
import type { UpdateSprintSchemaType } from './schemas';

/**
 * Create sprint and attach to project
 * @param { string } projectId - Project id
 * @param { SprintType } sprintData - Sprint data
 * @requires { projectId } - Project id - must be valid project ObjectId
 * @returns { Promise<{ success: boolean; sprint: SprintType }> } - Sprint data
 */

export const createSprintAndAttachToProject = async (
	projectId: string,
	sprintData: Omit<SprintType, 'createdAt' | 'updatedAt' | 'projectId'>,
): Promise<{
	success: boolean;
	sprint: HydratedDocument<SprintType>;
	project: ProjectType;
}> => {
	try {
		const sprint: HydratedDocument<SprintType> = await Sprint.create({
			...sprintData,
			projectId,
		});

		if (!sprint) {
			throw new InternalServerError('Sprint create operation failed');
		}

		// 2. Add reference into project
		const project = await Project.findByIdAndUpdate(
			projectId,
			{ $push: { sprints: sprint._id } },
			{ new: true },
		);

		if (!project) {
			// rollback manually
			await Sprint.findByIdAndDelete(sprint._id);
			throw new InternalServerError(
				'Project update failed. Sprint rolled back.',
			);
		}

		return {
			success: true,
			sprint,
			project,
		};
	} catch (err) {
		logger.error(err);
		throw new InternalServerError('Sprint create operation failed');
	}
};

/**
 * Get sprint by id
 * @param { string } id - Sprint id
 * @returns { Promise<SprintType | null> } - Sprint data
 */
export const getSprintById = async (id: string): Promise<SprintType | null> => {
	const sprint = await Sprint.findById(id).populate('tasks');
	if (!sprint) {
		throw new NotFoundError('Sprint not found');
	}
	return sprint;
};

/**
 * Update sprint by id
 * @param { string } id - Sprint id
 * @param { UpdateSprintSchemaType } sprintData - Sprint data
 * @returns { Promise<SprintType | null> } - Sprint data
 */

export const updateSprintById = async (
	id: string,
	sprintData: UpdateSprintSchemaType,
): Promise<SprintType | null> => {
	if (sprintData.startDate && sprintData.endDate) {
		if (new Date(sprintData.startDate) > new Date(sprintData.endDate)) {
			throw new BadRequestError('Start date must be before end date');
		}
	}
	const sprint = await Sprint.findByIdAndUpdate(id, sprintData, { new: true });
	if (!sprint) {
		throw new NotFoundError('Sprint not found');
	}
	return sprint;
};

/**
 * Delete sprint by id
 * @param { string } id - Sprint id
 * @returns { Promise<void> } - Void
 */

export const deleteSprintById = async (id: string): Promise<void> => {
	const sprint = await Sprint.findByIdAndDelete(id);
	if (!sprint) {
		throw new NotFoundError('Sprint not found');
	}

	await Project.findByIdAndUpdate(sprint.projectId, { $pull: { sprints: id } });
};

/**
 * Create task under sprint
 * @param { string } id - Sprint id
 * @param { CreateTaskSchemaType } taskData - Task data
 * @returns { Promise<HydratedDocument<TaskType>> } Task data
 */

export const createTask = async (
	id: string,
	taskData: CreateTaskSchemaType,
) => {
	const isExistSprint = await Sprint.findById(id);
	if (!isExistSprint) {
		throw new NotFoundError('Sprint not found');
	}

	const { success, task } = await createTaskAndAttachToSprint(id, taskData);

	if (!success) {
		throw new InternalServerError('Task create operation failed');
	}

	return task;
};

/** Get tasks under sprint
 * @param { string } id - Sprint id
 * @returns { Promise<HydratedDocument<TaskType>[]> } Task data
 */
export const getSprintTasks = async (id: string) => {
	const isExistSprint = await Sprint.findById(id).populate('tasks');
	if (!isExistSprint) {
		throw new NotFoundError('Sprint not found');
	}

	return isExistSprint.tasks;
};

export const sprintService = {
	getSprintById,
	updateSprintById,
	deleteSprintById,
	createTask,
	getSprintTasks,
};
