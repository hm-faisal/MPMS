import { format, transports } from 'winston';
import { consoleFormat } from '../formats';

const { combine, timestamp } = format;

/**
 * Console transport configuration
 * Adds a timestamp so the console format has a valid `timestamp` field.
 */
export const consoleTransport = new transports.Console({
	format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), consoleFormat),
});
