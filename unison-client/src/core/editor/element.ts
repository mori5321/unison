import { Phantomic } from '../../utils/phantomic';

export const editorElementKeys = {
  circle: '__editorElementCircle',
  rectangle: '__editorElementRectangle',
  text: '__editorElementText',
} as const;

export type EditorElementCircle = Phantomic<
  {
    x: number;
    y: number;
    radius: number;
    color: string;
  },
  typeof editorElementKeys.circle
>;

export type EditorElementRectangle = Phantomic<
  {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
  },
  typeof editorElementKeys.rectangle
>;

export type EditorElementText = Phantomic<
  {
    x: number;
    y: number;
    text: string;
    color: string;
    fontSize: number;
  },
  typeof editorElementKeys.text
>;

export const isCircle = (e: EditorElement): e is EditorElementCircle => e.__tag === editorElementKeys.circle;

export const isText = (e: EditorElement): e is EditorElementText => e.__tag === editorElementKeys.text;

export const isRectangle = (e: EditorElement): e is EditorElementRectangle => e.__tag === editorElementKeys.rectangle;


export type EditorElement = EditorElementCircle | EditorElementRectangle | EditorElementText;

