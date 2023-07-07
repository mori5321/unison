import { DefaultValue } from 'recoil';
import { atom, useRecoilState } from 'recoil'

type Phantomic<T, U extends string> = T & { __tag: U }

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
  e.__tag === editorElementKeys.circle

export const isText = (e: EditorElement): e is EditorElementText =>
  e.__tag === editorElementKeys.text

export const isRectangle = (e: EditorElement): e is EditorElementRectangle =>
  e.__tag === editorElementKeys.rectangle

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

// TODO: Share types or interface with server side in some way.
type EditorState = {
  image: HTMLImageElement | null,
  elements: EditorElement[]
}


const editorState = atom<EditorState>({
  key: 'editorState',
  default: {
    image: null,
    elements: [] as EditorElement[],
  } as EditorState,
  effects: [
    ({ setSelf, onSet }) => {
      onSet((newValue, oldValue) => {
        if (oldValue instanceof DefaultValue) return; 
        if (newValue.elements === oldValue.elements) return;
        
        console.log('elements changed', newValue.elements)

        fetch('http://127.0.0.1:8787/ping')
          .then(async (res) => {
            const json = await res.text()
            console.log('response', json)
          })
          .catch(e => {
          console.log('server is not running', e)
          setSelf(oldValue)
        })

        console.log('Fetched')
      })
    }
  ]
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
      __tag: editorElementKeys.circle,
    })
  }

  const addText = (params: Pick<EditorElementText, 'x' | 'y' | 'text'>) => {
    addElement({
      x: params.x,
      y: params.y,
      text: params.text,
      color: 'black',
      fontSize: 20,
      __tag: editorElementKeys.text,
    })
  }

  const onImageSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = (e) => {
      const image = new Image();
      image.src = e.target?.result as string;
      set(s => ({ ...s, image }))
    }
    reader.readAsDataURL(file);
  }

  return {
    image: state.image,
    elements: state.elements,
    onImageSelected,
    addCircle,
    addText,
  }
}
