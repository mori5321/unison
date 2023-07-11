import { Env } from '../env';

// EditorCreateHandler

// EditorListHandler
//
// EditorFetchHandler

export const EditorUpdateHandler = async (request: Request, env: Env) => {
  let id = env.EDITOR.idFromName('editor');
  let obj = env.EDITOR.get(id);
  let resp = await obj.fetch('https://.../update', request);

  return resp;
};

export const EditorDeleteHandler = async (request: Request, env: Env) => {
  let id = env.EDITOR.idFromName('editor');
  let obj = env.EDITOR.get(id);
  let resp = await obj.fetch('https://.../delete', request);

  return resp;
};

export const EditorWsHandler = async (request: Request, env: Env) => {
  let id = env.EDITOR.idFromName('editor');
  let obj = env.EDITOR.get(id);
  let resp = await obj.fetch('https://.../ws', request);

  return resp;
};
