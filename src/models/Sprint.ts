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
		order: {
			type: Number,
			unique: true,
			required: true,
			default: 1,
		},
		projectId: {
			type: Schema.ObjectId,
			ref: 'Project',
			required: true,
		},
	},
	{ timestamps: true },
);

export const Sprint = model('Sprint', sprintSchema);
export type SprintType = InferSchemaType<typeof sprintSchema>;
