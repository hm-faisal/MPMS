import { Router } from 'express';
import { isAuthenticated } from '@/middleware/authenticate.middleware';
import { sprintController } from './sprints.controller';

const router = Router();

// TODO: get sprints stats

router.get('/:id/stats', isAuthenticated, sprintController.getSprintsStats);
router.get('/:id', isAuthenticated, sprintController.getSprintById);
router.patch('/:id', isAuthenticated, sprintController.updateSprintById);
router.delete('/:id', isAuthenticated, sprintController.deleteSprint);

/**
 * Task routes
 */
router.post('/:id/tasks', isAuthenticated, sprintController.createTask);
router.get('/:id/tasks', isAuthenticated, sprintController.getSprintTasks);

export const sprintRoutes = router;
