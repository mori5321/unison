import { Env } from '../env';
import { EditorState } from '../types/editor';

export class Editor {
  #state: DurableObjectState;

  constructor(state: DurableObjectState, _env: Env) {
    this.#state = state;
  }

  async fetch(request: Request) {
    let url = new URL(request.url);
    switch (url.pathname) {
      case '/fetch':
        const value = await this.#state.storage.get<EditorState>('value');
        return new Response(JSON.stringify(value), { status: 200 });
      case '/update':
        const body = await request.json<EditorState>();
        await this.#state.storage.put('value', body);

        this.#state.getWebSockets().forEach((ws) => {
          console.log('ws');
          ws.send(JSON.stringify(body));
        });

        return new Response(JSON.stringify({ message: 'ok' }), { status: 200 });
      case '/delete':
        await this.#state.storage.delete('value');
        return new Response(JSON.stringify({ message: 'ok' }), { status: 200 });
      case '/ws':
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

      default:
        return new Response('Not Found', { status: 404 });
    }
  }
}
