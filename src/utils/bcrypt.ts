import { compare, hash } from 'bcrypt';
import config from 'config';

export const hashService = (text: string) =>
	hash(text, config.get('bcrypt.saltRounds'));

export const compareService = (text: string, hash: string) =>
	compare(text, hash);
