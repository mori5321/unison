import { atom, useRecoilState, DefaultValue } from 'recoil';
import { EditorElement, editorElementKeys, EditorElementText, EditorElementCircle } from './element'
import { fetchEditorById } from './client';
import { isLeft } from 'fp-ts/lib/Either';

type EditorState = {
  id: string;
  image: HTMLImageElement | null;
  elements: EditorElement[];
};


const editorState = atom<EditorState>({
  key: 'editorState',
  default: {
    id: '',
    image: null,
    elements: [] as EditorElement[],
  } as EditorState,
  effects: [
    ({ onSet }) => {
      onSet(async (newValue, oldValue) => {
        if (oldValue instanceof DefaultValue) return;
        if (newValue.id === oldValue.id) return;
      });
    },
  ],
});

export const useEditorElements = () => {
  const [state, set] = useRecoilState(editorState);

  const initById = async (id: string) => {
    const res = await fetchEditorById(id);

    if (isLeft(res)) {
      console.error('Invalid Response');
      return;
    }

    const { data } = res.right;
    set({
      id: data.id,
      image: null,
      elements: data.elements
    });
  };

  const cleanup = () => {
    set({
      id: '',
      image: null,
      elements: [],
    });
  };

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
    editorId: state.id,
    initById,
    cleanup,
    image: state.image,
    elements: state.elements,
    onImageSelected,
    addCircle,
    addText,
  };
};
