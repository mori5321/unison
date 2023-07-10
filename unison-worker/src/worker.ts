import { handleRequest } from './handlers';
import { Env } from './env';

export { Counter } from './durableObjects/counter';
export { Editor } from './durableObjects/editor';

export default {
	async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
		return handleRequest(request, env);
	},
};

