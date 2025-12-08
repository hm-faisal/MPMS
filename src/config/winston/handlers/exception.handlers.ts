import DailyRotateFile from 'winston-daily-rotate-file';

export const exceptionHandlers = [
	new DailyRotateFile({
		filename: 'logs/exceptions/exceptions-%DATE%.log',
		datePattern: 'YYYY-MM-DD',
		zippedArchive: true,
		maxSize: '20m',
		maxFiles: '30d',
	}),
];
