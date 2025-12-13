import { type InferSchemaType, model, Schema } from 'mongoose';

const sprintSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			max: 255,
		},
		startDate: {
			type: String,
			required: true,
		},
		endDate: {
			type: String,
			required: true,
		},
		projectId: {
			type: Schema.ObjectId,
			ref: 'Project',
			required: true,
		},
		tasks: {
			type: [Schema.ObjectId],
			ref: 'Task',
			required: false,
		},
	},
	{ timestamps: true },
);

export const Sprint = model('Sprint', sprintSchema);
export type SprintType = InferSchemaType<typeof sprintSchema>;
