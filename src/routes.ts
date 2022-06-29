import { Express, Request, Response } from 'express';

import validateResource from './middleware/validateResource';

import { createUserSchema } from './schema/user.schema';

import { createUserHandler } from './controller/user.controller';


function routes(app: Express) {
	app.get('/healthcheck', (req: Request, res: Response) => {
		res.sendStatus(418);
	});

	app.post('/api/users', validateResource(createUserSchema), createUserHandler);
}

export default routes;