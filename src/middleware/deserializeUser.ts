import { Request, Response, NextFunction } from 'express';

import { get } from 'lodash';

import { verifyJwt } from '../utils/jwt.utils';

const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
	// remove "Bearer ..."" from token
	const accesToken = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');
	if (!accesToken) {
		return next();
	}

	const { decoded, expired } = verifyJwt(accesToken);
	if (decoded) {
		// store jwt into locals
		res.locals.user = decoded;
		return next();
	}
	return next();
};

export default deserializeUser;