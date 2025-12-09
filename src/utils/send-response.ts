import type { Response } from 'express';
import { cookieOptions } from '@/constants/cookie-options';

interface IMeta {
	page?: number;
	total?: number;
	limit?: number;
	skip?: number;
	totalPage?: number;
	next?: number;
	prev?: number;
}

interface IJsonObject<T, M> {
	code?: number;
	success?: boolean;
	message: string;
	data: T;
	meta?: M | IMeta;
	links?: Record<string, string>;
}

export const sendResponse = <T, M>(
	res: Response,
	jsonObject: IJsonObject<T, M>,
) => {
	res.status(jsonObject.code || 200).json({
		code: jsonObject.code || 200,
		success: jsonObject.success || true,
		...jsonObject,
	});
};

export const sendResponseWithCookie = <T, M>(
	res: Response,
	jsonObject: IJsonObject<T, M>,
	cookieValue: string,
) => {
	res.cookie('token', cookieValue, cookieOptions);
	sendResponse(res, jsonObject);
};
