<<<<<<< HEAD
<<<<<<< HEAD
import { Request, Response } from 'express';

import config from 'config';

import { createSession } from '../service/session.service';
import { validatePassword } from '../service/user.service';
import { signJwt } from '../utils/jwt.utils';

export async function createUserSessionHandler(req: Request, res: Response) {
	// validate pwd
	const user = await validatePassword(req.body);

	if(!user){
		return res.status(401).send('Invalid email or password');
	}
=======
=======
>>>>>>> main
import { Request, response, Response } from 'express';

import config from 'config';

import { validatePassword } from '../service/user.service';
import { createSession, findSessions, updateSession } from '../service/session.service';
import { signJwt } from '../utils/jwt.utils';



export async function createUserSessionHandler(req: Request, res: Response) {
	// validate user pwd
	const user = await validatePassword(req.body);
	if (!user) {
		return res.status(401).send('Invalid email or password ');
	}

<<<<<<< HEAD
>>>>>>> session
=======
>>>>>>> main
	// create session
	const session = await createSession(user._id, req.get('user-agent') || '');
	// create access token
	const accessToken = signJwt(
<<<<<<< HEAD
<<<<<<< HEAD
		{...user, session: session._id},
		{expiresIn: config.get('accessTokenTtl')});
	// create refresh token
	const refreshToken = signJwt(
		{...user, session: session._id},
		{expiresIn: config.get('refreshTokenTtl')});
	// return tokens

	return res.send({ accessToken, refreshToken});
=======
=======
>>>>>>> main
		{ ...user, session: session._id },
		// 15min
		{ expiresIn: config.get('accessTokenTtl') }
	);
	// create refresh token
	const refreshToken = signJwt(
		{ ...user, session: session._id },
		// 15min
		{ expiresIn: config.get('refreshTokenTtl') }
	);
	// return tokens
	return res.send({ accessToken, refreshToken });
}

export async function getUserSessionsHandler(req: Request, res: Response) {
	// fetch user from deserializeUser() -> res.locals
	const userId = res.locals.user._id;

	// get only valid sessions
	const sessions = await findSessions({ user: userId, valid: true });

	return response.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
	const sessionId = res.locals.user.session;

	// update session valid to false
	await updateSession({_id: sessionId}, {valid: false});

	return res.send({
		accessToken: null,
		refreshToken: null
	});
<<<<<<< HEAD
>>>>>>> session
=======
>>>>>>> main
}