import { atom, useRecoilState, DefaultValue } from 'recoil';
import { EditorElement, editorElementKeys, EditorElementText, EditorElementCircle } from './element';
import { fetchEditorById, wsEditorById } from '../client';
import { isLeft } from 'fp-ts/lib/Either';
import sampleImage from '../../../assets/sample.jpeg';
import { genUUID } from '../../../utils/uuid';
import { useCanvasArea } from '../../../pages/EditorsPage/useCanvasArea';
import { produce } from 'immer';
import { useEffect, useRef } from 'react';
import { setEngine } from 'crypto';

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
  const { toCenterOrigin } = useCanvasArea();
  const websocket = useRef<WebSocket>()

  const setElements = (elements: EditorElement[]) => {
    set((s) => ({ ...s, elements }));

    const body = {
      ...state,
      elements,
    }
    websocket.current?.send(JSON.stringify(body))
  };

  useEffect(() => {
    if (!state.id) return;

    console.log('connecting')
    const ws = wsEditorById(state.id)
    console.log('connected')
    websocket.current = ws;

    // // 雑すぎる気がするあとで直す
    // // reconnect on close
    // ws.addEventListener('close', () => {
    //   console.log('Reconnecting...');
    //   // sleep 3000ms
    //   new Promise((resolve) => setTimeout(resolve, 3000)).then(() => {
    //     initById(state.id);
    //   })
    // });
    
    const onMessage = (event: MessageEvent) => {
      console.log('event', event.data)
      const data = JSON.parse(event.data);
      console.log('Data', data);

      set({
        ...data,
        image: state.image,
      })
    }
    ws.addEventListener('message', onMessage);

    return () => {
      ws.close();
      ws.removeEventListener('message', () => {});
    }
  }, [state.id])

  const initById = async (id: string) => {
    const res = await fetchEditorById(id);


    if (isLeft(res)) {
      console.error(res.left);
      return;
    }

    const mockImage = new Image();
    mockImage.src = sampleImage;

    const { data } = res.right;
    set({
      id: data.id,
      image: mockImage,
      elements: data.elements,
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
    // set((s) => ({ ...s, elements: [...s.elements, element] }));
    setElements([...state.elements, element]);
  };

  // TODO: use Phantom Type or Alias type for returning ID.
  const addCircle = (params: Pick<EditorElementCircle, 'x' | 'y'>): string => {
    const id = genUUID();
    // TODO: refactor tight coupling with useCanvasArea
    const { x, y } = toCenterOrigin(params.x, params.y);
    addElement({
      id,
      x,
      y,
      radius: 24,
      color: '#000000CC',
      __tag: editorElementKeys.circle,
    });

    return id;
  };

  // TODO: use Phantom Type or Alias type for returning ID.
  const addText = (params: Pick<EditorElementText, 'x' | 'y' | 'text'>): string => {
    const id = genUUID();

    const { x, y } = toCenterOrigin(params.x, params.y);
    addElement({
      id,
      x,
      y,
      text: params.text,
      color: 'black',
      fontSize: 16,
      __tag: editorElementKeys.text,
    });

    return id;
  };

  const updateElement = (element: EditorElement) => {
    const next = produce(state, (draft) => {
      const index = draft.elements.findIndex((e) => e.id === element.id);
      if (index === -1) return draft;

      draft.elements[index] = element;
    });

    // set(next);
    setElements(next.elements);
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
    updateElement,
  };
};
