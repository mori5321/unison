import { Router } from 'itty-router';
import { Env } from '../env';
import { SyncHandler } from './sync.handler';
import { PingHandler } from './ping.handler';
import {
  EditorWsHandler,
  EditorUpdateHandler,
  EditorInitHandler,
  EditorDeleteHandler,
  EditorListHandler,
  EditorFetchHandler,
} from './editor.handler';

const router = Router();
router.get('/sync', SyncHandler);
router.get('/ping', PingHandler);
router.get('/editors', EditorListHandler);
router.get('/editors/:id', EditorFetchHandler);
router.put('/editors', EditorUpdateHandler);
router.delete('/editors', EditorDeleteHandler);
router.post('/editors', EditorInitHandler);
router.get('/ws/editor', EditorWsHandler);

export const handleRequest = async (request: Request, env: Env): Promise<Response> => {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*', // TODO: check Origin
        'Access-Control-Allow-Methods': 'GET,HEAD,POST,PUT,PATH,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  return router.handle(request, env);
};
