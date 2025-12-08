import config from 'config';

/**
 * Get environment from config or default to 'development'
 * @returns string
 */
export const getEnvironment = (): string => {
	try {
		return config.get<string>('server.env') || 'development';
	} catch {
		return 'development';
	}
};
