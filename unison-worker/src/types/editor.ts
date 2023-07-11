// TODO: Share types or interface with client in some way.
type Phantomic<T, U extends string> = T & { _kind: U };

const editorElementKeys = {
  circle: '__editorElementCircle',
  rectangle: '__editorElementRectangle',
  text: '__editorElementText',
} as const;

type EditorElementCircle = Phantomic<
  {
    x: number;
    y: number;
    radius: number;
    color: string;
  },
  typeof editorElementKeys.circle
>;

type EditorElementRectangle = Phantomic<
  {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
  },
  typeof editorElementKeys.rectangle
>;

type EditorElementText = Phantomic<
  {
    x: number;
    y: number;
    text: string;
    color: string;
    fontSize: number;
  },
  typeof editorElementKeys.text
>;

type EditorElement = EditorElementCircle | EditorElementRectangle | EditorElementText;

export type EditorState = {
  image: null | string;
  elements: EditorElement[];
};
