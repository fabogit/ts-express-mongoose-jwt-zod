import { Request, Response, NextFunction, response } from 'express';

import { get } from 'lodash';
import { reissueAccessToken } from '../service/session.service';

import { verifyJwt } from '../utils/jwt.utils';

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
	// get Tokens from request headers
	// remove "Bearer ..."" from token
	const accesToken = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');
	const refreshToken = get(req, 'headers.x-refresh');

	if (!accesToken) {
		return next();
	}
	// decode token
	const { decoded, expired } = verifyJwt(accesToken);
	console.log('decoded', decoded);

	if (decoded) {
		// if token is decoded store jwt into locals
		res.locals.user = decoded;
		return next();
	}

	// if token expired and refresh is present -> reissueAccessToken
	if (expired && refreshToken) {
		const newAccessToken = await reissueAccessToken({refreshToken});

		if (newAccessToken) {
			// updated token on header
			response.setHeader('x-access-token', newAccessToken);
		}

		// decode new token
		const result = verifyJwt(newAccessToken);
		// store jwt into locals
		response.locals.user = result.decoded;
		return next();
	}


	return next();
};

export default deserializeUser;