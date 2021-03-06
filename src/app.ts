import express from 'express';

import config from 'config';
import dotenv from 'dotenv';
dotenv.config();

import connect from './utils/connect';
import logger from './utils/logger';
import deserializeUser from './middleware/deserializeUser';
import routes from './routes';

const port: number =  config.get('node.port');

const app = express();

app.use(express.json());
app.use(deserializeUser);

app.listen(port, async () => {
	logger.info(`Server running @ http://localhost:${port}`);
	await connect();
	routes(app);
});