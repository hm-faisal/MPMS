import { model, Schema } from 'mongoose';
import { UserRole } from '@/constants';

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		min: 3,
		max: 255,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		min: 3,
		max: 255,
	},
	password: {
		type: String,
		required: true,
		min: 6,
		max: 32,
	},
	role: {
		type: String,
		required: true,
		enum: Object.values(UserRole),
	},
	department: {
		type: [String],
		required: false,
	},
	skills: {
		type: [String],
		required: false,
	},
});

export const User = model('User', userSchema);
