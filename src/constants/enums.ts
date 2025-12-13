export enum UserRole {
	ADMIN = 'Admin',
	MANAGER = 'Manager',
	MEMBER = 'Member',
}

export enum ProjectStatus {
	PLANNED = 'Planned',
	ACTIVE = 'Active',
	COMPLETED = 'Completed',
	ARCHIVED = 'Archived',
}

export enum TaskPriority {
	LOW = 'Low',
	MEDIUM = 'Medium',
	HIGH = 'High',
	CRITICAL = 'Critical',
}

export const TaskStatus = {
	TODO: 'To Do',
	IN_PROGRESS: 'In Progress',
	REVIEW: 'Review',
	DONE: 'Done',
};
