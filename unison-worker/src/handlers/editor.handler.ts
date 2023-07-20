import { Env } from '../env';

// EditorCreateHandler
export const EditorInitHandler = async (_request: Request, env: Env) => {
  const id = env.EDITOR.newUniqueId();
  const obj = env.EDITOR.get(id);

  const resp = await obj.fetch('https://.../create');

  return resp;
};

export const EditorDeleteHandler = async (request: Request, _env: Env) => {
  // const id = request;
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  if (!id) return new Response('Missing id', { status: 400 });

  return new Response(`Deleted: ${id}`, { status: 200 });
};

// EditorListHandler
//
// EditorFetchHandler

export const EditorUpdateHandler = async (request: Request, env: Env) => {
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
