import { atom, useRecoilState, DefaultValue } from 'recoil';
import { ping } from './client';
import { EditorElement, editorElementKeys, EditorElementText, EditorElementCircle } from './element'

type EditorState = {
  image: HTMLImageElement | null;
  elements: EditorElement[];
};


const editorState = atom<EditorState>({
  key: 'editorState',
  default: {
    image: null,
    elements: [] as EditorElement[],
  } as EditorState,
  effects: [
    ({ onSet }) => {
      onSet(async (newValue, oldValue) => {
        if (oldValue instanceof DefaultValue) return;
        if (newValue.elements === oldValue.elements) return;

        const result = await ping();
        if (result instanceof Error) {
          console.error('server is not running', result);
          return;
        }

        console.log('ping result', result);
      });
    },
  ],
});

export const useEditorElements = () => {
  const [state, set] = useRecoilState(editorState);

  const addElement = (element: EditorElement) => {
    set((s) => ({ ...s, elements: [...s.elements, element] }));
  };

  const addCircle = (params: Pick<EditorElementCircle, 'x' | 'y'>) => {
    addElement({
      x: params.x,
      y: params.y,
      radius: 50,
      color: '#000000CC',
      __tag: editorElementKeys.circle,
    });
  };

  const addText = (params: Pick<EditorElementText, 'x' | 'y' | 'text'>) => {
    addElement({
      x: params.x,
      y: params.y,
      text: params.text,
      color: 'black',
      fontSize: 20,
      __tag: editorElementKeys.text,
    });
  };

  const onImageSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = (e) => {
      const image = new Image();
      image.src = e.target?.result as string;
      set((s) => ({ ...s, image }));
    };
    reader.readAsDataURL(file);
  };

  return {
    image: state.image,
    elements: state.elements,
    onImageSelected,
    addCircle,
    addText,
  };
};