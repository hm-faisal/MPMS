import { ProjectStatus } from '@/constants';
import { BadRequestError, InternalServerError, NotFoundError } from '@/errors';
import { Project, type ProjectType } from '@/models/Project';
import { User } from '@/models/User';
import type { CreateSprintSchema } from '../sprints/schemas';
import { createSprintAndAttachToProject } from '../sprints/sprints.service';
import type { MemberSchema, UpdateProjectSchema } from './schemas';

/**
 * Create a new project
 * @param { ProjectType } project - Project data
 * @returns { Promise<ProjectType> } - Created project
 */
export const createProject = async ({
	thumbnail,
	status,
	budget,
	description,
	...project
}: Pick<ProjectType, 'title' | 'client' | 'startDate' | 'endDate'> & {
	budget?: number | undefined;
	description?: string | undefined;
	thumbnail?: string | undefined;
	status?: ProjectStatus | undefined;
}): Promise<ProjectType> => {
	if (project.startDate > project.endDate) {
		throw new BadRequestError('Start date cannot be greater than end date');
	}
	const newProject = await Project.create({
		...project,
		budget: budget || null,
		description: description || null,
		thumbnail: thumbnail || null,
		status: status || ProjectStatus.PLANNED,
	});
	return newProject;
};

/**
 * Get all projects
 * @returns { Promise<ProjectType[]> } - Array of projects
 */
export const getAllProjects = async (): Promise<ProjectType[]> => {
	const projects = await Project.find();
	return projects;
};

/**
 * Get project by id
 * @param {string} id - Project id
 * @returns { Promise<ProjectType | null> } - Project
 */
export const getProjectById = async (
	id: string,
): Promise<ProjectType | null> => {
	const project = await Project.findById(id);
	return project;
};

/**
 * Update project by id
 * @param {string} id - Project id
 * @param {Omit<ProjectType, 'createdAt' | 'updatedAt'>} project - Project data
 * @returns { Promise<ProjectType | null> } - Updated project
 */
export const updateProject = async (
	id: string,
	project: Omit<ProjectType, 'createdAt' | 'updatedAt'>,
): Promise<ProjectType | null> => {
	const updatedProject = await Project.findByIdAndUpdate(id, project, {
		new: true,
	});
	return updatedProject;
};

/**
 * Delete project by id
 * @param {string} id - Project id
 * @returns { Promise<ProjectType | null> } - Deleted project
 */

export const deleteProject = async (
	id: string,
): Promise<ProjectType | null> => {
	const deletedProject = await Project.findByIdAndDelete(id);
	return deletedProject;
};

/**
 * Patch project by id
 * @param {string} id - Project id
 * @param {UpdateProjectSchema} project - Project data
 * @returns { Promise<ProjectType | null> } - Patched project
 */

export const patchProject = async (
	id: string,
	project: UpdateProjectSchema,
): Promise<ProjectType | null> => {
	if (project.startDate && project.endDate) {
		if (project.startDate > project.endDate) {
			throw new BadRequestError('Start date cannot be greater than end date');
		}
	}

	const isExist = await getProjectById(id);

	if (!isExist) {
		throw new NotFoundError('Project not found');
	}

	if (project.startDate && !project.endDate) {
		if (project.startDate < isExist.endDate) {
			throw new BadRequestError('Start date cannot be less than end date');
		}
	}

	if (project.endDate && !project.startDate) {
		if (project.endDate < isExist.startDate) {
			throw new BadRequestError('End date cannot be less than start date');
		}
	}

	const updatedProject = await Project.findByIdAndUpdate(id, project, {
		new: true,
	});
	return updatedProject;
};

/**
 * Post member to project
 * @param {string} id - Project id
 * @param {PostMemberSchema} data - User ids
 * @returns { Promise<ProjectType | null> } - Patched project
 */
export const postMember = async (
	id: string,
	data: MemberSchema,
): Promise<ProjectType | null> => {
	const existingUsers = await User.find({ _id: { $in: data.userIds } }).select(
		'_id',
	);

	const missingUserIds = data.userIds.filter(
		(id) => !existingUsers.map((user) => user._id.toString()).includes(id),
	);

	if (missingUserIds.length > 0) {
		throw new NotFoundError(`${missingUserIds.length} users not found`);
	}

	const updatedProject = await Project.findByIdAndUpdate(
		id,
		{ members: data.userIds },
		{
			new: true,
		},
	);
	return updatedProject;
};

const getProjectMembersById = async (id: string) => {
	const project = await Project.findById(id)
		.select('members')
		.populate('members', '-password');
	return project;
};

/**
 * Delete member from project
 * @param {string} id - Project id
 * @param {string} userId - User id
 * @returns { Promise<ProjectType | null> } - Updated project
 */

export const deleteMember = async (
	id: string,
	userId: string,
): Promise<ProjectType | null> => {
	const existingUser = await User.findById(userId);
	if (!existingUser) {
		throw new NotFoundError('User not found');
	}

	const updatedProject = await Project.findByIdAndUpdate(
		id,
		{ $pull: { members: userId } },
		{ new: true },
	);

	return updatedProject;
};

/**
 * Post sprint to project
 * @param {string} id - Project id
 * @param {CreateSprintSchema} data - Sprint data
 * @returns { Promise<ProjectType | null> } - Updated project
 */
export const postProjectSprint = async (
	id: string,
	data: CreateSprintSchema,
): Promise<ProjectType | null> => {
	const existingProject = await Project.findById(id);
	if (!existingProject) {
		throw new NotFoundError('Project not found');
	}

	const { success, project } = await createSprintAndAttachToProject(id, data);
	if (!success) {
		throw new InternalServerError('Sprint create operation failed');
	}

	return project;
};

/**
 * Get project sprints by id
 * @param {string} id - Project id
 * @returns { Promise<ProjectType | null> } - Project sprints
 */

export const getProjectSprintsById = async (id: string) => {
	const isExist = await Project.findById(id);
	if (!isExist) {
		throw new NotFoundError('Project not found');
	}

	const project = await Project.findById(id)
		.select('sprints')
		.populate('sprints');
	return project;
};

export const projectService = {
	createProject,
	getProjectById,
	patchProject,
	deleteProject,
	postMember,
	getProjectMembersById,
	deleteMember,
	postProjectSprint,
	getProjectSprintsById,
};
