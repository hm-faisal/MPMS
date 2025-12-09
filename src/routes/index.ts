import type { Router } from 'express';
import express from 'express';

const router = express.Router();

const routers: { path: string; router: Router }[] = [];

routers.forEach((route) => {
	router.use(route.path, route.router);
});

export const applicationRoutes = router;
