/**
 * Winston Logger Configuration
 * logging with multiple transports and custom formatting
 */

import winston from 'winston';
import { exceptionHandlers, rejectionHandlers } from './handlers';
import {
	consoleTransport,
	errorFileTransport,
	infoFileTransport,
} from './transports';
import { getEnvironment, getLogLevel } from './utils';

const environment = getEnvironment();
const logLevel = getLogLevel();

/**
 * Winston logger instance
 */
const logger = winston.createLogger({
	level: logLevel,
	defaultMeta: { service: 'MPMS-server', environment },
	transports: [consoleTransport, infoFileTransport, errorFileTransport],
	// Handle exceptions and rejections
	exceptionHandlers,
	rejectionHandlers,
	exitOnError: false,
});

/**
 * Stream for Morgan HTTP logger integration
 */
export const stream = {
	write: (message: string) => {
		logger.info(message.trim());
	},
};

export default logger;
