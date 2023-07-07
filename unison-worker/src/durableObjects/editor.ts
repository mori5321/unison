import { Env } from '../env';

export class Editor {
  #state: DurableObjectState;

  constructor(state: DurableObjectState, _env: Env) {
    this.#state = state;
  }

  async fetch(request: Request) {
    let url = new URL(request.url); 
    let value: EditorState = (await this.#state.storage.get('value')) || { elements: [] };

    switch (url.pathname) {
      case '/':
        if (request.method === 'POST') {
          const body = await request.json<EditorState>();
          // TODO: Run time type checking
          await this.#state.storage.put('value', body);
          return new Response(JSON.stringify(value), { status: 200 });
        } else if (request.method === 'DELETE') {
          await this.#state.storage.delete('value');
          return new Response(JSON.stringify(value), { status: 200 });
        } else {
          return new Response('Method Not Allowed', { status: 405 })
        }

      default:
        return new Response('Not Found', { status: 404 }); 
    }
  }
}


// TODO: Share types or interface with client in some way.
type Phantomic<T, U extends string> = T & { _kind: U }

const editorElementKeys = {
  circle: '__editorElementCircle',
  rectangle: '__editorElementRectangle',
  text: '__editorElementText',
} as const;

type EditorElementCircle = Phantomic<{
  x: number,
  y: number,
  radius: number,
  color: string,
}, typeof editorElementKeys.circle>

type EditorElementRectangle = Phantomic<{
  x: number,
  y: number,
  width: number,
  height: number,
  color: string,
}, typeof editorElementKeys.rectangle>

type EditorElementText = Phantomic<{
  x: number,
  y: number,
  text: string,
  color: string,
  fontSize: number,
}, typeof editorElementKeys.text>

type EditorElement = EditorElementCircle | EditorElementRectangle | EditorElementText;

type EditorState = {
  elements: EditorElement[]
}
