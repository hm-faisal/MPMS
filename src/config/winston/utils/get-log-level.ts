import config from 'config';

/**
 * Get log level from config or default to 'info'
 * @returns string
 */
export const getLogLevel = (): string => {
	try {
		return config.get<string>('logLevel') || 'info';
	} catch {
		return 'info';
	}
};
