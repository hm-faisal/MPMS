export class NotFoundError extends Error {
	code: number;

	constructor(message: string = 'Resource Not Found') {
		super(message);
		this.name = 'NotFoundError';
		this.code = 404;
	}
}
