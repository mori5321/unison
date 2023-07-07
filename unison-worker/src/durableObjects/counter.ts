import { Env } from '../env';

export class Counter {
	#state: DurableObjectState;

	constructor(state: DurableObjectState, _env: Env) {
		this.#state = state;
	}

	async fetch(request: Request) {
		let url = new URL(request.url);
		let value: number = (await this.#state.storage.get('value')) || 0;

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
