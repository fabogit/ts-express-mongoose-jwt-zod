import { Request, Response } from 'express';

import config from 'config';

import { validatePassword } from '../service/user.service';
import { createSession } from '../service/session.service';
import { signJwt } from '../utils/jwt.utils';



export async function createUserSessionHandler(req: Request, res: Response) {
	// validate user pwd
	const user = await validatePassword(req.body);
	if(!user){
		return res.status(401).send('Invalid email or password ');
	}

	// create session
	const session = await createSession(user._id, req.get('user-agent') || '');
	// create access token
	const accesToken = signJwt(
		{...user,	session: session._id},
		// 15min
		{expiresIn: config.get('accesTokenTtl')}
	);
	// create refresh token
	const refreshToken = signJwt(
		{...user,	session: session._id},
		// 15min
		{expiresIn: config.get('accesTokenTtl')}
	);
	// return tokens
	return res.send({ accesToken, refreshToken});
}