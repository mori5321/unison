import { Env } from '../env';
import { EditorState } from '../core/editor';
import { applicationDefaultHeader } from '../handlers/headers';

// const editorKey = 'editor' as const;

const initEditor = (id: string): EditorState => ({
  id,
  image: null,
  elements: [],
});

// const okResponse = JSON.stringify({ message: 'ok' });

export class Editor {
  #state: DurableObjectState;

  constructor(state: DurableObjectState, _env: Env) {
    this.#state = state;
  }

  async fetch(request: Request) {
    const url = new URL(request.url);

    if (url.pathname === '/list') {
      const map = await this.#state.storage.list<EditorState>();
      const values: EditorState[] = Array.from(map.values());

      console.log(values);
      const resp = { data: values };

      return new Response(JSON.stringify(resp), { headers: applicationDefaultHeader, status: 200 });
    } else if (url.pathname === '/fetch') {
      const id = url.searchParams.get('id');
      if (!id) return new Response('Missing id', { status: 400, headers: applicationDefaultHeader });

      const editor = await this.#state.storage.get<EditorState>(id);
      if (!editor) return new Response('Not Found', { status: 404, headers: applicationDefaultHeader });

      const resp = { data: editor };
      return new Response(JSON.stringify(resp), { headers: applicationDefaultHeader, status: 200 });
    } else if (url.pathname === '/create') {
      const uuid = crypto.randomUUID();
      const editor = initEditor(uuid);
      console.log(editor);
      await this.#state.storage.put<EditorState>(uuid, editor);

      const resp = { data: editor };
      return new Response(JSON.stringify(resp), { headers: applicationDefaultHeader, status: 201 });
    } else if (url.pathname === '/ws') {
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
