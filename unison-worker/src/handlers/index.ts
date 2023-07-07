import { Router } from 'itty-router';
import { Env } from '../env';
import { SyncHandler } from './sync.handler';
import { PingHandler } from './ping.handler';

const router = Router();
router.get('/sync', SyncHandler);
router.get('/ping', PingHandler);

export const handleRequest = async (request: Request, env: Env): Promise<Response> => {
	return router.handle(request, env);
};
