import { Either, isLeft, left } from 'fp-ts/lib/Either';
import { WorkerURL } from '../common/env';
import * as t from 'io-ts';

const editorResponse = t.type({
  id: t.string,
});

type EditorResponse = t.TypeOf<typeof editorResponse>;


type Phantomic<T, U extends string> = T & { _kind: U };

// TODO: refactot it, make them reusable 
type InvalidResponseError = Phantomic<{
  message: string;
}, '__invalidResponseError'>

const InvalidResponseError = {
  new: (message: string): InvalidResponseError => ({
    message,
    _kind: '__invalidResponseError',
  })
};

type UnknownError = Phantomic<{}, '__unknownError'>

const UnknownError = {
  new: (): UnknownError => ({
    _kind: '__unknownError',
  })
};

type EditorResponseError = InvalidResponseError | UnknownError;

export const ping = async () => {
  const res = await fetch(`${WorkerURL}/ping`);
  try {
    res.text();
  } catch {
    return new Error('ping failed');
  }
};

export const createEditor = async (): Promise<Either<EditorResponseError, EditorResponse>> => {
  try {
    const res = await fetch(`${WorkerURL}/editor`, { method: 'POST' });
    const json = await res.json();
    const response = editorResponse.decode(json);

    if (isLeft(response)) {
      const err = InvalidResponseError.new(
        `Invalid response: ${JSON.stringify(response.left)}`
      )
      return left(err);
    } else {
      return response
    }
  } catch {
    const err = UnknownError.new();
    return left(err);
  }
}
