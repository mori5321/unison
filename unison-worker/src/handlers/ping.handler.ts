import { Env } from '../env';

export const PingHandler = async (_req: Request, env: Env) => {
	let id = env.COUNTER.idFromName('counter1');
	let obj = env.COUNTER.get(id);
	let resp = await obj.fetch('https://.../increment');
	let count = await resp.text();

	return new Response(count, { status: 200 });
};
