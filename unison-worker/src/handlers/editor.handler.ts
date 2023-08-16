import { Env } from '../env';
import { IRequest } from 'itty-router';
import { applicationDefaultHeader } from './headers';

// EditorCreateHandler
export const EditorInitHandler = async (_request: IRequest, env: Env) => {
  const id = env.EDITOR.idFromName('editor');
  const obj = env.EDITOR.get(id);

  const resp = await obj.fetch('https://.../create');

  return resp;
};

const mockEditors = [
  {
    id: 'timestopblue',
    image: null,
    elements: [],
  },
  {
    id: 'helloskytone',
    image: null,
    elements: [],
  },
];

export const EditorListHandler = async (_request: IRequest, _env: Env) => {
  const body = { data: mockEditors };

  return new Response(JSON.stringify(body), { headers: applicationDefaultHeader });
};

export const EditorFetchHandler = async (request: IRequest, _env: Env) => {
  const id = request.params['id'];

  const editor = mockEditors.find((editor) => editor.id === id);
  if (!editor) {
    return new Response('Not Found', { status: 404 })
  }

  const body = { data: editor };
  return new Response(JSON.stringify(body), { headers: applicationDefaultHeader });
};

// export const EditorFetchHandler = async (request: IRequest, env: Env) => {
//   const id = env.EDITOR.idFromName('editor');
//   const obj = env.EDITOR.get(id);
//
//   const editorId = request.params['id'];
//   const resp = await obj.fetch(`https://.../fetch?id=${editorId}`, request);
//
//   return resp;
// };

export const EditorDeleteHandler = async (request: IRequest, _env: Env) => {
  // const id = request;
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  if (!id) return new Response('Missing id', { status: 400 });

  return new Response(`Deleted: ${id}`, { status: 200 });
};

// EditorListHandler
//
// EditorFetchHandler

export const EditorUpdateHandler = async (request: IRequest, env: Env) => {
  let id = env.EDITOR.idFromName('editor');
  let obj = env.EDITOR.get(id);
  let resp = await obj.fetch('https://.../update', request);

  return resp;
};

// export const EditorDeleteHandler = async (request: Request, env: Env) => {
//   let id = env.EDITOR.idFromName('editor');
//   let obj = env.EDITOR.get(id);
//   let resp = await obj.fetch('https://.../delete', request);
//
//   return resp;
// };

export const EditorWsHandler = async (request: Request, env: Env) => {
  let id = env.EDITOR.idFromName('editor');
  let obj = env.EDITOR.get(id);
  let resp = await obj.fetch('https://.../ws', request);

  return resp;
};
