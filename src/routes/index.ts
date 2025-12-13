import { Router } from 'express';
import { authRoutes } from '@/modules/auth/auth.routes';
import { projectsRoutes } from '@/modules/projects/projects.routes';
import { sprintRoutes } from '@/modules/sprints/sprints.routes';
import { taskRoutes } from '@/modules/tasks/tasks.routes';
import { userRoutes } from '@/modules/users/users.routes';

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
	{
		router: projectsRoutes,
		path: '/projects',
	},
	{
		router: sprintRoutes,
		path: '/sprints',
	},
	{
		router: taskRoutes,
		path: '/tasks',
	},
];

routers.forEach((route) => {
	router.use(route.path, route.router);
});

export const applicationRoutes = router;
