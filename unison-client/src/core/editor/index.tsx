import { useMemo } from 'react';
import { atom, useRecoilState } from 'recoil'

type Phantomic<T, U extends string> = T & { kind: U }

const editorElementKeys = {
  circle: '__editorElementCircle',
  rectangle: '__editorElementRectangle',
} as const;

type EditorElementCircle = Phantomic<{
  x: number,
  y: number,
  radius: number,
  color: string,
}, typeof editorElementKeys.circle>

type EditorElementRectangle = Phantomic<{
  x: number,
  y: number,
  width: number,
  height: number,
  color: string,
}, typeof editorElementKeys.rectangle>

type EditorElement = EditorElementCircle | EditorElementRectangle

type EditorState = {
  elements: EditorElement[]
}

const editorState = atom<EditorState>({
  key: 'editorState',
  default: { elements: [] }
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
      color: 'green',
      kind: editorElementKeys.circle,
    })
  }


  const circles = useMemo(() => {
    return state.elements.filter(e => e.kind === editorElementKeys.circle) as EditorElementCircle[]
  }, [state.elements])

  return {
    addCircle,
    circles,
  }
}

