import z from 'zod';
import { validateStringArray } from '@/validators';

export const memberSchema = z.object({
	userIds: validateStringArray('User IDs'),
});

export type MemberSchema = z.infer<typeof memberSchema>;
