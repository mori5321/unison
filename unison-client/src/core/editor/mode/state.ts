import { useMemo } from 'react';
import { atom, useRecoilState } from 'recoil';

type EditorMode = 'text::insert' | 'text::edit' | 'circle::insert';

type EditorModeState = {
  mode: EditorMode;
  targetElementId: string;
};

const editorModeState = atom<EditorModeState>({
  key: 'editorModeState',
  default: {
    mode: 'text::insert',
    targetElementId: '',
  } as EditorModeState,
});

export const useEditorMode = () => {
  const [state, set] = useRecoilState(editorModeState);

  const startTextInsertMode = () =>
    set({
      mode: 'text::insert',
      targetElementId: '',
    });
  const startTextEditMode = (targetElementId: string) =>
    set({
      mode: 'text::edit',
      targetElementId: targetElementId,
    });
  const startCircleInsertMode = () =>
    set({
      mode: 'circle::insert',
      targetElementId: '',
    });

  const isMode = (mode: EditorMode) => state.mode === mode;

  const isTextMode = useMemo<boolean>(() => {
    const first = state.mode.split('::')[0];
    if (first) {
      return first === 'text';
    }
    return false;
  }, [state.mode]);

  const isCircleMode = useMemo<boolean>(() => {
    const first = state.mode.split('::')[0];
    if (first) {
      return first === 'circle';
    }
    return false;
  }, [state.mode]);

  return {
    mode: state.mode,
    startTextInsertMode,
    startTextEditMode,
    startCircleInsertMode,
    isMode,
    isTextMode,
    isCircleMode,
  };
};
