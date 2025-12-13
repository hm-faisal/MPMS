import { Router } from 'express';
import { isAuthenticated } from '@/middleware/authenticate.middleware';
import { hasPermission } from '@/middleware/has-permission.middleware';
import { validateRequest } from '@/middleware/validate-request.middleware';
import { updateTaskSchema } from './schemas';
import { taskController } from './tasks.controller';

const router = Router();

// TODO: get tasks stats

// TODO: assign a task to user
// TODO: unassign a task from user
// TODO: get tasks
router.get(
	'/:id',
	isAuthenticated,
	hasPermission('viewTask'),
	taskController.getTaskById,
);

router.get('/', isAuthenticated, taskController.getTasks);
// TODO: get task
router.patch(
	'/:id',
	validateRequest(updateTaskSchema),
	isAuthenticated,
	taskController.updateTaskById,
);
// TODO: update task status
// TODO: delete task
router.delete(
	'/:id',
	isAuthenticated,
	hasPermission('deleteTask'),
	taskController.deleteTask,
);

export const taskRoutes = router;
