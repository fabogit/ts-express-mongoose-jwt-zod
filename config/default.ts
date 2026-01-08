/* eslint-disable quotes */
export default {
	node: {
		port: 1337,
	},
	mongo: {
		dbUri: 'mongodb://127.0.0.1:27017/rest-ts-jwt',
	},
	saltWorkFactor: 10,
	accessTokenTtl: '5m',
	refreshTokenTtl: '1y',
	publicKey: process.env.PUBLIC_KEY,
	privateKey: process.env.PRIVATE_KEY,
};