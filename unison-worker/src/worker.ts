import { handleRequest } from './handlers';
import { Env } from './env';

export default {
	async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
		return handleRequest(request, env);
	},
};

export class Counter {
	#state: DurableObjectState;

	constructor(state: DurableObjectState, _env: Env) {
		this.#state = state;
	}

	async fetch(request: Request) {
		console.log('Fetch!');
		let url = new URL(request.url);
		let value: number = (await this.#state.storage.get('value')) || 0;

		console.log('url', url);

		switch (url.pathname) {
			case '/increment':
				value++;
				break;
			case '/decrement':
				value--;
				break;
			case '/':
				break;
			default:
				return new Response('Not Found', { status: 404 });
		}

		await this.#state.storage.put('value', value);

		return new Response(value.toString(), { status: 200 });
	}
}
