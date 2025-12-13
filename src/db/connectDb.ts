import { connect } from 'mongoose';
import { logger } from '@/config';

export const connectDb = async (db_user: string, db_password: string) => {
	try {
		logger.info(
			`mongodb+srv://${db_user}:${db_password}@cluster0.60lftio.mongodb.net/mpms?appName=Cluster0`,
		);
		await connect(
			`mongodb+srv://${db_user}:${db_password}@cluster0.60lftio.mongodb.net/mpms?appName=Cluster0`,
		);
		logger.info('Database connected successfully');
	} catch (_error) {
		logger.error('Database connection failed');
	}
};
