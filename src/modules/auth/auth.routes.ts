import { Router } from 'express';
import { isAuthenticated } from '@/middleware/authenticate.middleware';
import { authController } from './auth.controller';

const router = Router();

router.get('/me', isAuthenticated, authController.getMe);
router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/logout', authController.logout);
router.post('/forgot-password', () => {});
router.post('/reset-password', () => {});

export const authRoutes = router;
