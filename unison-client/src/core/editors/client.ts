import * as t from 'io-ts';
import { Either, isLeft, left } from 'fp-ts/lib/Either';
import { Phantomic } from '../../utils/phantomic'
import { WorkerURL } from '../common/env';

// TODO: refactot it, make them reusable 
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

type EditorResponse = t.TypeOf<typeof editorResponse>;

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
  } catch (e) {
    const err = UnknownError.new(e as Error);
    return left(err);
  }
}
