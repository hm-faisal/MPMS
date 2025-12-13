import { Router } from 'express';
import { isAuthenticated } from '@/middleware/authenticate.middleware';
import { hasPermission } from '@/middleware/has-permission.middleware';
import { validateRequest } from '@/middleware/validate-request.middleware';
import { createSprintSchema } from '../sprints/schemas';
import { projectController } from './projects.controller';
import {
	createProjectSchema,
	memberSchema,
	updateProjectSchema,
} from './schemas';

const router = Router();

router.post(
	'/:id/members',
	validateRequest(memberSchema),
	isAuthenticated,
	projectController.postMember,
);
router.post(
	'/',
	validateRequest(createProjectSchema),
	isAuthenticated,
	hasPermission('createProject'),
	projectController.postProject,
);
// TODO: add :id/stats
router.get('/:id/stats', isAuthenticated, () => {});
// TODO: add :id/activity
router.get('/:id/activity', isAuthenticated, () => {});
router.get('/:id/members', isAuthenticated, projectController.getMembers);
router.get(
	'/:id',
	isAuthenticated,
	hasPermission('viewProject'),
	projectController.getProject,
);
router.get(
	'/',
	isAuthenticated,
	hasPermission('viewProject'),
	projectController.getProjects,
);
router.patch(
	'/:id',
	validateRequest(updateProjectSchema),
	isAuthenticated,
	hasPermission('editProject'),
	projectController.patchProject,
);
router.delete(
	'/:id/members/:userId',
	isAuthenticated,
	projectController.deleteMember,
);
router.delete('/:id', isAuthenticated, projectController.deleteProject);

/**
 * Sprints Module Routes
 */
router.post(
	'/:id/sprints',
	validateRequest(createSprintSchema),
	isAuthenticated,
	hasPermission('createSprint'),
	projectController.postProjectSprint,
);
router.get(
	'/:id/sprints',
	isAuthenticated,
	hasPermission('viewSprint'),
	projectController.getProjectSprints,
);

export const projectsRoutes = router;
