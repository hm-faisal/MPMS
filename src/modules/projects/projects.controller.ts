import { BadRequestError, NotFoundError } from '@/errors';
import { catchAsync } from '@/utils/catch-async';
import { sendResponse } from '@/utils/send-response';
import { getAllProjects, projectService } from './projects.service';
import {
	createProjectSchema,
	memberSchema,
	updateProjectSchema,
} from './schemas';

const postProject = catchAsync(async (req, res) => {
	const parseData = createProjectSchema.parse(req.body);
	const project = await projectService.createProject(parseData);

	sendResponse(res, {
		code: 201,
		message: 'Project created successfully',
		data: project,
	});
});

const getProjects = catchAsync(async (_req, res) => {
	const projects = await getAllProjects();

	sendResponse(res, {
		code: 200,
		message: 'Projects fetched successfully',
		data: projects,
	});
});

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

export const projectController = {
	postProject,
	getProjects,
	getProject,
	patchProject,
	deleteProject,
	postMember,
	getMembers,
	deleteMember,
};
