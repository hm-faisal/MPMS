import z from 'zod';
import { validatePassword } from '@/validators';

export const changePasswordSchema = z
	.object({
		oldPassword: validatePassword(),
		newPassword: validatePassword(),
		confirmNewPassword: validatePassword(),
	})
	.refine((data) => data.newPassword === data.confirmNewPassword, {
		message: 'Passwords do not match',
		path: ['confirmNewPassword'],
	});

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
