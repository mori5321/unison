import { useMemo } from 'react';
import { atom, useRecoilState } from 'recoil'

type Phantomic<T, U extends string> = T & { _kind: U }

const editorElementKeys = {
  circle: '__editorElementCircle',
  rectangle: '__editorElementRectangle',
  text: '__editorElementText',
} as const;

type EditorElementCircle = Phantomic<{
  x: number,
  y: number,
  radius: number,
  color: string,
}, typeof editorElementKeys.circle>

export const isCircle = (e: EditorElement): e is EditorElementCircle =>
  e._kind === editorElementKeys.circle

export const isText = (e: EditorElement): e is EditorElementText =>
  e._kind === editorElementKeys.text

export const isRectangle = (e: EditorElement): e is EditorElementRectangle =>
  e._kind === editorElementKeys.rectangle

type EditorElementRectangle = Phantomic<{
  x: number,
  y: number,
  width: number,
  height: number,
  color: string,
}, typeof editorElementKeys.rectangle>

type EditorElementText = Phantomic<{
  x: number,
  y: number,
  text: string,
  color: string,
  fontSize: number,
}, typeof editorElementKeys.text>

type EditorElement = EditorElementCircle | EditorElementRectangle | EditorElementText

type EditorState = {
  image: HTMLImageElement | null,
  elements: EditorElement[]
}

const editorState = atom<EditorState>({
  key: 'editorState',
  default: {
    image: null,
    elements: []
  }
});


export const useEditorElements = () => {
  const [state, set] = useRecoilState(editorState);

  const addElement = (element: EditorElement) => {
    set(s => ({ ...s, elements: [...s.elements, element] }))
  }

  const addCircle = (params: Pick<EditorElementCircle, 'x' | 'y'>) => {
    addElement({
      x: params.x,
      y: params.y,
      radius: 50,
      color: '#000000CC',
      _kind: editorElementKeys.circle,
    })
  }

  const addText = (params: Pick<EditorElementText, 'x' | 'y' | 'text'>) => {
    addElement({
      x: params.x,
      y: params.y,
      text: params.text,
      color: 'black',
      fontSize: 20,
      _kind: editorElementKeys.text,
    })
  }



  const texts = useMemo(() => {
    return state.elements.filter(isText)
  }, [state.elements])


  const onImageSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = (e) => {
      const image = new Image();
      image.src = e.target?.result as string;
      console.log('On Load')
      set(s => ({ ...s, image }))
    }
    reader.readAsDataURL(file);
  }

  return {
    texts,
    image: state.image,
    elements: state.elements,
    onImageSelected,
    addCircle,
    addText,
  }
}
