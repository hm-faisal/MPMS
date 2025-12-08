import DailyRotateFile from 'winston-daily-rotate-file';
import { errorFormat } from '../formats';

/**
 * File transport for error logs only with daily rotation
 * @returns {DailyRotateFile}
 */
export const errorFileTransport = new DailyRotateFile({
	filename: 'logs/errors/error-%DATE%.log',
	datePattern: 'YYYY-MM-DD',
	zippedArchive: true,
	maxSize: '20m',
	maxFiles: '30d',
	level: 'error',
	format: errorFormat,
});
