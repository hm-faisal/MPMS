import { type InferSchemaType, model, Schema } from 'mongoose';
import { TaskPriority, TaskStatus } from '@/constants';

const taskSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: false,
		},
		assignees: {
			type: [Schema.Types.ObjectId],
			ref: 'User',
			required: true,
		},
		estimate: {
			type: Number,
			required: false,
		},
		priority: {
			type: String,
			enum: TaskPriority,
			default: TaskPriority.MEDIUM,
			required: true,
		},
		status: {
			type: String,
			enum: TaskStatus,
			default: TaskStatus.TODO,
			required: true,
		},
		dueDate: {
			type: Date,
			required: true,
		},
		sprint: {
			type: Schema.Types.ObjectId,
			ref: 'Sprint',
			required: true,
		},
	},
	{ timestamps: true },
);

export const Task = model('Task', taskSchema);
export type TaskType = InferSchemaType<typeof taskSchema>;
