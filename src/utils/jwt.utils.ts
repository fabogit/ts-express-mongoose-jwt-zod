import jwt from 'jsonwebtoken';
import config from 'config';

const privateKey: string = config.get('privateKey');
const publicKey: string = config.get('publicKey');

export function signJwt(object: Object, options?: jwt.SignOptions | undefined){
	return jwt.sign(object, privateKey, {
		// before spread check if it is not undefined
		...(options && options),
		algorithm: 'RS256'
	});
}

export function verifyJwt(token: string){
	try {
		const decoded = jwt.verify(token, publicKey);
		return {
			valid: true,
			expired: false,
			decoded
		};
	} catch (err: any) {
		return {
			valid: false,
			expired: err.message === 'jwt expired',
			decoded: null
		};
	}
}