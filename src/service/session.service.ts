<<<<<<< HEAD
import SessionModel from '../models/session.model';

export async function createSession(userId: string, userAgent: string) {
	const session = await SessionModel.create({ user: userId, userAgent });

	return session.toJSON();
=======
import { get } from 'lodash';
import { FilterQuery, UpdateQuery } from 'mongoose';
import config from 'config';

import SessionModel, { SessionDocument } from '../models/session.model';
import { signJwt, verifyJwt } from '../utils/jwt.utils';
import { findUser } from './user.service';

export async function createSession(userId: string, userAgent: string) {
	const session = await SessionModel.create({ user: userId, userAgent: userAgent });
	return session.toJSON();
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
	return await SessionModel.find(query).lean();
}

export async function updateSession(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) {
	return await SessionModel.updateOne(query, update);
}

export async function reissueAccessToken(refreshToken: string) {

	const { decoded } = verifyJwt(refreshToken);

	if (!decoded || !get(decoded, 'session')) return false;

	const session = await SessionModel.findById(get(decoded, 'session'));

	if (!session || !session.valid) return false;

	const user = await findUser({ _id: session.user });

	if (!user) return false;

	// create access token
	const accessToken = signJwt(
		{ ...user, session: session._id },
		// 15min
		{ expiresIn: config.get('accessTokenTtl') }
	);
	return accessToken;
>>>>>>> session
}