import { Router } from 'express';
import { isAuthenticated } from '@/middleware/authenticate.middleware';
import { sprintController } from './sprints.controller';

const router = Router();

// TODO: get sprints stats
// TODO: get sprint by id
// TODO: update sprint
// TODO: update sprint order
// TODO: delete sprint

router.get('/:id/stats', isAuthenticated, sprintController.getSprintsStats);
router.get('/:id', isAuthenticated, sprintController.getSprintById);
router.patch('/:id', isAuthenticated, sprintController.updateSprintById);
router.delete('/:id', isAuthenticated, sprintController.deleteSprint);

export const sprintRoutes = router;
