import { Router } from 'express';
import { authRoutes } from '@/modules/auth/auth.routes';
import { userRoutes } from '@/modules/user/user.routes';

const router = Router();

const routers: { path: string; router: Router }[] = [
	{
		router: authRoutes,
		path: '/auth',
	},
	{
		router: userRoutes,
		path: '/users',
	},
];

routers.forEach((route) => {
	router.use(route.path, route.router);
});

export const applicationRoutes = router;
