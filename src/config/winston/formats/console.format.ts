import { format } from 'winston';

const { printf } = format;

/**
 * Custom log format for console output
 * @returns string
 */

export const consoleFormat = printf(({ level, message, timestamp, stack, ...metadata }) => {
	let log = `${timestamp} [${level}]: ${message}`;

	// Add stack trace for errors
	if (stack) {
		log += `\n${stack}`;
	}

	// Add metadata if present
	if (Object.keys(metadata).length > 0) {
		log += `\n${JSON.stringify(metadata, null, 2)}`;
	}

	return log;
});
