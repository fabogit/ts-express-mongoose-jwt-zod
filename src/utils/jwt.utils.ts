import jwt from 'jsonwebtoken';
import config from 'config';

// const privateKey = process.env.PRIVATE_KEY as string;//config.get('privateKey');
// const publicKey = process.env.PUBLIC_KEY as string;//config.get('publicKey');

const privateKey = config.get<string>('privateKey');
const publicKey = config.get<string>('publicKey');

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
	// sign using privateKey
	return jwt.sign(object, privateKey, {
		...(options && options),
		algorithm: 'ES256'
	});
}

export function verifyJwt(token: string) {
// verify using publicKey
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