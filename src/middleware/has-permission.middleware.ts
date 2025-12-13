import type { NextFunction, Request, Response } from 'express';
import { UserRole } from '@/constants';
import { ForbiddenRequestError, UnauthorizedError } from '@/errors';

const MANAGERPERMISSIONS = [
	'createProject',
	'viewProject',
	'editProject',
	'deleteProject',
	'createSprint',
	'viewSprint',
	'editSprint',
	'deleteSprint',
	'createTask',
	'viewTask',
	'editTask',
	'deleteTask',
	'createUser',
	'viewUser',
	'editUser',
	'deleteUser',
];

const MEMBERPERMISSIONS = [
	'viewProject',
	'viewSprint',
	'viewTask',
	'updateTask',
];

/**
 * Middleware to check if the user has the required permission.
 * @param {string} permission
 * @returns void
 */

export const hasPermission =
	(permission: string) => (req: Request, res: Response, next: NextFunction) => {
		if (!req.user || !req.user.userId || !req.user.role) {
			throw new UnauthorizedError('Unauthorized');
		}

		switch (req.user.role) {
			case UserRole.ADMIN:
				return next();

			case UserRole.MANAGER:
				if (MANAGERPERMISSIONS.includes(permission)) {
					return next();
				}
				throw new ForbiddenRequestError('Forbidden - Insufficient Permissions');

			case UserRole.MEMBER:
				if (MEMBERPERMISSIONS.includes(permission)) {
					return next();
				}
				throw new ForbiddenRequestError('Forbidden - Insufficient Permissions');

			default:
				throw new ForbiddenRequestError('Forbidden - Invalid Role');
		}
	};
