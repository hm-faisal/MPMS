import { transports } from 'winston';
import { consoleFormat } from '../formats';

/**
 * Console transport configuration
 * @returns {ConsoleTransportInstance}
 */

export const consoleTransport = new transports.Console({
	format: consoleFormat,
});
