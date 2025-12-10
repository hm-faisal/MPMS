import { Router } from 'express';
import { isAuthenticated } from '@/middleware/authenticate.middleware';
import { userController } from './user.controller';

const router = Router();

router.get('/profile', isAuthenticated, userController.getProfile);
router.get('/:id', isAuthenticated, userController.getUserById);
router.get('/', isAuthenticated, userController.getUsers);
router.patch('/profile', isAuthenticated, userController.updateUser);
router.post('/change-password', isAuthenticated, userController.changePassword);

export const userRoutes = router;
