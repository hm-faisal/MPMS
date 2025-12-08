import { format } from 'winston';

const { combine, timestamp, errors, json } = format;

export const errorFormat = combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }), json());
