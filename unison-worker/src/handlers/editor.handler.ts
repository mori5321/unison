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



export const EditorWsHandler = async (request: IRequest, env: Env) => {
  const id = request.params['id'];
  console.log('EditorWsHandler')

  if (!id) return new Response('No id', { status: 400 });

  console.log('Here1', id)

  //
  // const durableObjectId = env.EDITOR.newUniqueId();
  const durableObjectId = env.EDITOR.idFromName(id);
  console.log('durableObjectId', durableObjectId, durableObjectId.toString())

  const durableObject = env.EDITOR.get(durableObjectId);
  
  console.log('Here2')

  let resp = await durableObject.fetch('https://.../ws', request);
  
  console.log('Here3')

  return resp;
};
