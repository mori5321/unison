import { handleRequest } from './handlers';
import { Env } from './env';

export { Counter } from './durableObjects/counter';

export default {
	async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
		return handleRequest(request, env);
	},
};

