import { BadRequestError, NotFoundError } from '@/errors';
import { catchAsync } from '@/utils/catch-async';
import { sendResponse } from '@/utils/send-response';
import { createSprintSchema } from '../sprints/schemas';
import { getAllProjects, projectService } from './projects.service';
import {
	createProjectSchema,
	memberSchema,
	updateProjectSchema,
} from './schemas';

/**
 * Create a new project
 * @route POST /api/v1/projects
 * @requires { ProjectType } body - Project data
 * @access Private
 */
const postProject = catchAsync(async (req, res) => {
	const parseData = createProjectSchema.parse(req.body);
	const project = await projectService.createProject(parseData);

	sendResponse(res, {
		code: 201,
		message: 'Project created successfully',
		data: project,
	});
});

/**
 * Get all projects
 * @route GET /api/v1/projects
 * @access Private
 */
const getProjects = catchAsync(async (_req, res) => {
	const projects = await getAllProjects();

	sendResponse(res, {
		code: 200,
		message: 'Projects fetched successfully',
		data: projects,
	});
});

/**
 * Get a project by ID
 * @route GET /api/v1/projects/:id
 * @requires { string } params.id - Project ID
 * @access Private
 */
const getProject = catchAsync(async (req, res) => {
	const id = req.params['id'];
	if (!id) {
		throw new BadRequestError('Project ID is required');
	}
	const project = await projectService.getProjectById(id);

	if (!project) {
		throw new NotFoundError('Project not found');
	}

	return sendResponse(res, {
		code: 200,
		message: 'Project fetched successfully',
		data: project,
	});
});

/**
 * Update a project by ID
 * @route PATCH /api/v1/projects/:id
 * @requires { string } params.id - Project ID
 * @requires { ProjectType } body - Project data
 * @access Private
 */
const patchProject = catchAsync(async (req, res) => {
	const id = req.params['id'];
	const parseData = updateProjectSchema.parse(req.body);
	if (!id) {
		throw new BadRequestError('Project ID is required');
	}

	const project = await projectService.patchProject(id, parseData);

	return sendResponse(res, {
		code: 200,
		message: 'Project updated successfully',
		data: project,
	});
});

/**
 * Delete a project by ID
 * @route DELETE /api/v1/projects/:id
 * @requires { string } params.id - Project ID
 * @access Private
 */
const deleteProject = catchAsync(async (req, res) => {
	const id = req.params['id'];
	if (!id) {
		throw new BadRequestError('Project ID is required');
	}

	const project = await projectService.deleteProject(id);

	return sendResponse(res, {
		code: 200,
		message: 'Project deleted successfully',
		data: project,
	});
});

/**
 * Add a member to a project
 * @route POST /api/v1/projects/:id/members
 * @requires { string } params.id - Project ID
 * @requires { MemberType } body - Members ids
 * @access Private
 */
const postMember = catchAsync(async (req, res) => {
	const id = req.params['id'];
	if (!id) {
		throw new BadRequestError('Project ID is required');
	}

	const parseData = memberSchema.parse(req.body);
	const project = await projectService.postMember(id, parseData);

	return sendResponse(res, {
		code: 200,
		message: 'Member added successfully',
		data: project,
	});
});

/**
 * Get members of a project
 * @route GET /api/v1/projects/:id/members
 * @requires { string } params.id - Project ID
 * @access Private
 */
const getMembers = catchAsync(async (req, res) => {
	const id = req.params['id'];
	if (!id) {
		throw new BadRequestError('Project ID is required');
	}

	const project = await projectService.getProjectMembersById(id);

	if (!project) {
		throw new NotFoundError('Project not found');
	}

	return sendResponse(res, {
		code: 200,
		message: 'Members fetched successfully',
		data: project,
	});
});

/**
 * Delete a member from a project
 * @route DELETE /api/v1/projects/:id/members/:userId
 * @requires { string } params.id - Project ID
 * @requires { string } params.userId - User ID
 * @access Private
 */
const deleteMember = catchAsync(async (req, res) => {
	const id = req.params['id'];
	const userId = req.params['userId'];
	if (!id || !userId) {
		throw new BadRequestError('Project ID and User ID are required');
	}

	const project = await projectService.deleteMember(id, userId);

	return sendResponse(res, {
		code: 200,
		message: 'Member deleted successfully',
		data: project,
	});
});

/**
 * Add a sprint to a project
 * @route POST /api/v1/projects/:id/sprints
 * @requires { string } params.id - Project ID
 * @requires { CreateSprintSchema } body - Sprint data
 * @access Private
 */
const postProjectSprint = catchAsync(async (req, res) => {
	const id = req.params['id'];
	if (!id) {
		throw new BadRequestError('Project ID is required');
	}

	const parseData = createSprintSchema.parse(req.body);
	const project = await projectService.postProjectSprint(id, parseData);

	return sendResponse(res, {
		code: 201,
		message: 'Sprint added successfully',
		data: project,
	});
});

const getProjectSprints = catchAsync(async (req, res) => {
	const id = req.params['id'];
	if (!id) {
		throw new BadRequestError('Project ID is required');
	}

	const project = await projectService.getProjectSprintsById(id);

	return sendResponse(res, {
		code: 200,
		message: 'Sprints fetched successfully',
		data: project,
	});
});

export const projectController = {
	postProject,
	getProjects,
	getProject,
	patchProject,
	deleteProject,
	postMember,
	getMembers,
	deleteMember,
	postProjectSprint,
	getProjectSprints,
};
