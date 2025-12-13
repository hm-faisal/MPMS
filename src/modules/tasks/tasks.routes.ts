import { Router } from 'express';
import { isAuthenticated } from '@/middleware/authenticate.middleware';
import { validateRequest } from '@/middleware/validate-request.middleware';
import { updateTaskSchema } from './schemas';
import { taskController } from './tasks.controller';

const router = Router();

// TODO: get tasks stats

// TODO: assign a task to user
// TODO: unassign a task from user
// TODO: get tasks
router.get('/:id', isAuthenticated, taskController.getTaskById);
// router.get('/', isAuthenticated, taskController.getTaskById);
// TODO: get task
router.patch(
	'/:id',
	validateRequest(updateTaskSchema),
	isAuthenticated,
	taskController.updateTaskById,
);
// TODO: update task status
// TODO: delete task

export const taskRoutes = router;
