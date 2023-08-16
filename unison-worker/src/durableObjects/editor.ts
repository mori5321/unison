import { Env } from '../env';

export class Editor {
  #state: DurableObjectState;

  constructor(state: DurableObjectState, _env: Env) {
    this.#state = state;
  }

  async fetch(request: Request) {
    const url = new URL(request.url);

    if (url.pathname === '/ws') {
      if (request.headers.get('Upgrade') != 'websocket') {
        return new Response('expected websocket', { status: 400 });
      }

      if (request.method !== 'GET') {
        return new Response('Method Not Allowed', { status: 405 });
      }

      // TODO: Rate Limit by IP Address
      // ref: https://github.com/cloudflare/workers-chat-demo/blob/master/src/chat.mjs
      let { 0: clientWs, 1: serverWs } = new WebSocketPair();
      this.#state.acceptWebSocket(serverWs);

      serverWs.addEventListener('message', async (msg) => {
        serverWs.send(msg.data);
      });

      return new Response(null, { status: 101, webSocket: clientWs });
    } else {
      return new Response('Not Found', { status: 404 });
    }
  }
}
