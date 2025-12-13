import type { HydratedDocument } from 'mongoose';
import { logger } from '@/config';
import { InternalServerError, NotFoundError } from '@/errors';
import { Sprint, type SprintType } from '@/models/Sprint';
import { Task, type TaskType } from '@/models/Task';
import { User } from '@/models/User';
import type { CreateTaskSchemaType, UpdateTaskSchemaType } from './schemas';

/**
 * Create task and attach to sprint
 * @param { string } sprintId - Sprint id
 * @param { TaskType } taskData - Task data
 * @requires { sprintId } - Sprint id - must be valid sprint ObjectId
 * @returns { Promise<{ success: boolean; task: TaskType; sprint: SprintType }> } - Task data
 */

export const createTaskAndAttachToSprint = async (
	sprintId: string,
	taskData: CreateTaskSchemaType,
): Promise<{
	success: boolean;
	task: HydratedDocument<TaskType>;
	sprint: HydratedDocument<SprintType>;
}> => {
	try {
		const validAssignee = await User.find({ _id: { $in: taskData.assignees } });

		if (!validAssignee.length) {
			throw new NotFoundError('Assignee not found');
		}

		const task: HydratedDocument<TaskType> = await Task.create({
			...taskData,
			description: taskData.description || null,
			sprint: sprintId,
			assignees: validAssignee.map((user) => user._id),
		});

		if (!task) {
			throw new InternalServerError('Task create operation failed');
		}

		const sprint = await Sprint.findByIdAndUpdate(
			sprintId,
			{ $push: { tasks: task._id } },
			{ new: true },
		);

		if (!sprint) {
			await Task.findByIdAndDelete(task._id);
			throw new InternalServerError('Sprint update failed. Task rolled back.');
		}

		return {
			success: true,
			sprint,
			task,
		};
	} catch (err) {
		logger.error(err);
		throw new InternalServerError('Sprint create operation failed');
	}
};

/**
 * Get task by id
 * @param { string } id - Task id
 * @returns { Promise<TaskType | null> } - Task data
 */

export const getTaskById = async (id: string): Promise<TaskType | null> => {
	const task = await Task.findById(id).populate([
		{
			path: 'assignees',
			select: '_id name email',
		},
		{
			path: 'sprint',
			populate: {
				path: 'projectId',
				select: '_id name',
			},
		},
	]);
	if (!task) {
		throw new NotFoundError('Task not found');
	}
	return task;
};

/**
 * Get all tasks
 * @returns  { Promise<TaskType[] | null> } - Task data
 */

export const getTasks = async () => {
	const tasks = await Task.find();
	return tasks;
};

/**
 * Update task by id
 * @param { string } id - Task id
 * @param { UpdateTaskSchemaType } updateData - Task data
 * @returns { Promise<TaskType | null> } - Task data
 */

export const updateTaskById = async (
	id: string,
	updateData: UpdateTaskSchemaType,
): Promise<TaskType | null> => {
	const task = await Task.findByIdAndUpdate(id, updateData, { new: true });
	if (!task) {
		throw new NotFoundError('Task not found');
	}
	return task;
};

export const taskService = {
	getTaskById,
	getTasks,
	updateTaskById,
};
