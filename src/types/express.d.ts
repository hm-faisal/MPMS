import { AccessTPayload } from '@/utils/jwt-helper';

declare global {
	namespace Express {
		interface Request {
			user?: AccessTPayload;
		}
	}
}
