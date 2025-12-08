import DailyRotateFile from 'winston-daily-rotate-file';

export const rejectionHandlers = [
	new DailyRotateFile({
		filename: 'logs/rejections/rejections-%DATE%.log',
		datePattern: 'YYYY-MM-DD',
		zippedArchive: true,
		maxSize: '20m',
		maxFiles: '30d',
	}),
];
