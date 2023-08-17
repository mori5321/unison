import * as t from 'io-ts';
import { Either, isLeft, left } from 'fp-ts/lib/Either';
import { Phantomic } from '../../utils/phantomic';
import { WorkerURL, WorkerWsUrl } from '../common/env';
import { editorElementKeys } from './element/element';

// TODO: refactor it, make them reusable
type InvalidResponseError = Phantomic<
  {
    message: string;
  },
  '__invalidResponseError'
>;

const InvalidResponseError = {
  new: (message: string): InvalidResponseError => ({
    message,
    __tag: '__invalidResponseError',
  }),
};

type UnknownError = Phantomic<
  {
    name: string;
    message: string;
  },
  '__unknownError'
>;

const UnknownError = {
  new: (e: Error): UnknownError => ({
    name: e.name,
    message: e.message,
    __tag: '__unknownError',
  }),
};

const editorElement = t.union([
  t.type({
    __tag: t.literal(editorElementKeys.circle),
    id: t.string,
    x: t.number,
    y: t.number,
    radius: t.number,
    color: t.string,
  }),
  t.type({
    __tag: t.literal(editorElementKeys.text),
    id: t.string,
    x: t.number,
    y: t.number,
    text: t.string,
    color: t.string,
    fontSize: t.number,
  }),
  t.type({
    __tag: t.literal(editorElementKeys.rectangle),
    id: t.string,
    x: t.number,
    y: t.number,
    width: t.number,
    height: t.number,
    color: t.string,
  }),
]);

const editorResponse = t.type({
  id: t.string,
  image: t.union([t.string, t.null]),
  elements: t.array(editorElement),
});

const fetchEditorResponse = t.type({
  data: editorResponse,
});

type FetchEditorResponse = t.TypeOf<typeof fetchEditorResponse>;

type EditorResponseError = InvalidResponseError | UnknownError;

export const fetchEditorById = async (id: string): Promise<Either<EditorResponseError, FetchEditorResponse>> => {
  const res = await fetch(`${WorkerURL}/editors/${id}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await res.json();
  const response = fetchEditorResponse.decode(json);

  if (isLeft(response)) {
    return left(InvalidResponseError.new(`Invalid response: ${JSON.stringify(response.left)}`));
  } else {
    return response;
  }
};

export const wsEditorById = (id: string): WebSocket => {
  return new WebSocket(`${WorkerWsUrl}/editors/${id}/ws`);
}
