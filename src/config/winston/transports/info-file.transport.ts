import DailyRotateFile from 'winston-daily-rotate-file';
import { infoFormat } from '../formats';

/**
 * File transport for info logs with daily rotation
 * @returns {DailyRotateFile}
 */

export const infoFileTransport = new DailyRotateFile({
	level: 'info',
	filename: 'logs/info/application-%DATE%.log',
	datePattern: 'YYYY-MM-DD',
	zippedArchive: true,
	maxSize: '20m',
	maxFiles: '14d',
	format: infoFormat,
});
