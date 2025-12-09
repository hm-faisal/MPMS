export class ForbiddenRequestError extends Error {
	code: number;

	constructor(message: string = 'Forbidden') {
		super(message);
		this.name = 'ForbiddenRequestError';
		this.code = 403;
	}
}
