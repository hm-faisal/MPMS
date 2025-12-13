import { Router } from 'express';
import { isAuthenticated } from '@/middleware/authenticate.middleware';
import { hasPermission } from '@/middleware/has-permission.middleware';
import { sprintController } from './sprints.controller';

const router = Router();

// TODO: get sprints stats

router.get('/:id/stats', isAuthenticated, sprintController.getSprintsStats);
router.get(
	'/:id',
	isAuthenticated,
	hasPermission('viewSprint'),
	sprintController.getSprintById,
);
router.get(
	'/',
	isAuthenticated,
	hasPermission('viewSprint'),
	sprintController.getSprints,
);
router.patch(
	'/:id',
	isAuthenticated,
	hasPermission('editSprint'),
	sprintController.updateSprintById,
);
router.delete(
	'/:id',
	isAuthenticated,
	hasPermission('deleteSprint'),
	sprintController.deleteSprint,
);

/**
 * Task routes
 */
router.post(
	'/:id/tasks',
	isAuthenticated,
	hasPermission('createTask'),
	sprintController.createTask,
);
router.get(
	'/:id/tasks',
	isAuthenticated,
	hasPermission('viewTask'),
	sprintController.getSprintTasks,
);

export const sprintRoutes = router;
