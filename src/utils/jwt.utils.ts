import jwt from 'jsonwebtoken';
import config from 'config';

const privateKey: string = config.get('privateKey');
const publicKey: string = config.get('publicKey');

function signJwt(object: Object, options?: jwt.SignOptions | undefined){
	return jwt.sign(object, privateKey, {
		// before spread check if it is not undefined
		...(options && options),
		algorithm: 'RS256'
	});
}

function verifyJwt(){
	//
}