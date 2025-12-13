import { Router } from 'express';
import { isAuthenticated } from '@/middleware/authenticate.middleware';
import { hasPermission } from '@/middleware/has-permission.middleware';
import { userController } from './users.controller';

const router = Router();

router.get('/profile', isAuthenticated, userController.getProfile);
router.get('/:id', isAuthenticated, userController.getUserById);
router.get('/', isAuthenticated, userController.getUsers);
router.patch(
	'/:id',
	isAuthenticated,
	hasPermission('editUser'),
	userController.updateUser,
);
router.patch('/profile', isAuthenticated, userController.updateUserProfile);
router.post('/change-password', isAuthenticated, userController.changePassword);
router.delete(
	'/:id',
	isAuthenticated,
	hasPermission('deleteUser'),
	userController.deleteUser,
);

export const userRoutes = router;
