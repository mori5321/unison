import * as t from 'io-ts';
import { Either, isLeft, left } from 'fp-ts/lib/Either';
import { Phantomic } from '../../utils/phantomic'
import { WorkerURL } from '../common/env';


// TODO: refactor it, make them reusable 
type InvalidResponseError = Phantomic<{
  message: string;
}, '__invalidResponseError'>

const InvalidResponseError = {
  new: (message: string): InvalidResponseError => ({
    message,
    __tag: '__invalidResponseError',
  })
};

type UnknownError = Phantomic<{
  name: string,
  message: string,
}, '__unknownError'>

const UnknownError = {
  new: (e: Error): UnknownError => ({
    name: e.name,
    message: e.message,
    __tag: '__unknownError',
  })
};

type EditorResponseError = InvalidResponseError | UnknownError;

const editorResponse = t.type({
  id: t.string,
});


const listEditorsResponse = t.type({
  data: t.array(editorResponse),
});

type ListEditorsResponse = t.TypeOf<typeof listEditorsResponse>;

export const listEditors = async (): Promise<Either<EditorResponseError, ListEditorsResponse>> => {
  const res = await fetch(`${WorkerURL}/editors`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  const json = await res.json();
  const response = listEditorsResponse.decode(json)

  if (isLeft(response)) {
    return left(InvalidResponseError.new(
      `Invalid response: ${JSON.stringify(response.left)}`
    ));
  } else {
    return response
  }
}


const createEditorResponse = t.type({
  data: editorResponse,
});

type CreateEditorResponse = t.TypeOf<typeof createEditorResponse>;

export const createEditor = async (): Promise<Either<EditorResponseError, CreateEditorResponse>> => {
  try {
    const res = await fetch(`${WorkerURL}/editors`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const json = await res.json();
    const response = createEditorResponse.decode(json);

    if (isLeft(response)) {
      const err = InvalidResponseError.new(
        `Invalid response: ${JSON.stringify(response.left)}`
      )
      return left(err);
    } else {
      return response
    }
  } catch (e) {
    const err = UnknownError.new(e as Error);
    return left(err);
  }
}
