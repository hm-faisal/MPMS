import { format } from 'winston';

const { combine, timestamp, errors, json } = format;

export const infoFormat = combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }), json());
