import { Router } from 'express';
import { isAuthenticated } from '@/middleware/authenticate.middleware';
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
	projectController.postProject,
);
// TODO: add :id/stats
router.get('/:id/stats', isAuthenticated, () => {});
// TODO: add :id/activity
router.get('/:id/activity', isAuthenticated, () => {});
router.get('/:id/members', isAuthenticated, projectController.getMembers);
router.get('/:id', isAuthenticated, projectController.getProject);
router.get('/', isAuthenticated, projectController.getProjects);
router.patch(
	'/:id',
	validateRequest(updateProjectSchema),
	isAuthenticated,
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
	projectController.postProjectSprint,
);
router.get(
	'/:id/sprints',
	isAuthenticated,
	projectController.getProjectSprints,
);

export const projectsRoutes = router;
