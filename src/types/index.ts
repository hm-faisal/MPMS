import type { ObjectId } from 'mongoose';
import type { UserRole } from '@/constants';

export type IUser = {
	_id?: ObjectId;
	name: string;
	email: string;
	password: string;
	role: UserRole;
	department?: string;
	skills?: string[];
};
