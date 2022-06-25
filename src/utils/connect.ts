import mongoose from 'mongoose';
import config from 'config';

import logger from './logger';

async function connect() {
	const dbUri: string = config.get('mongo.dbUri');

	try {
		await mongoose.connect(dbUri);
		logger.info('Database connected');
	} catch (error) {
		logger.error('Cant connect to db...', error);
		process.exit(1);
	}
}

export default connect;