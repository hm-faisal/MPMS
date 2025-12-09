import { connect } from 'mongoose';
import { logger } from '@/config';

export const connectDb = async (db_url: string) => {
	try {
		await connect(db_url);
		logger.info('Database connected successfully');
	} catch (_error) {
		logger.error('Database connection failed');
	}
};
