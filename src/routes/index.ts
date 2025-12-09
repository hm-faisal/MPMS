import { Router } from 'express';
import { authRoutes } from '@/modules/auth/auth.routes';

const router = Router();

const routers: { path: string; router: Router }[] = [
	{
		router: authRoutes,
		path: '/auth',
	},
];

routers.forEach((route) => {
	router.use(route.path, route.router);
});

export const applicationRoutes = router;
