import { type InferSchemaType, model, Schema } from 'mongoose';
import { ProjectStatus } from '@/constants';

const projectSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		client: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			trim: true,
			required: false,
			default: null,
		},
		startDate: {
			type: String,
			required: true,
		},
		endDate: {
			type: String,
			required: true,
		},
		budget: {
			type: Number,
			required: false,
			default: null,
		},
		status: {
			type: String,
			enum: ProjectStatus,
			required: false,
			default: ProjectStatus.PLANNED,
		},
		thumbnail: {
			type: String,
			required: false,
			default: null,
		},
		members: {
			type: [Schema.ObjectId],
			ref: 'User',
			required: false,
			default: [],
		},
	},
	{ timestamps: true },
);

export type ProjectType = InferSchemaType<typeof projectSchema>;

export const Project = model<ProjectType>('Project', projectSchema);
