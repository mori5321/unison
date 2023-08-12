import { atom, useRecoilState } from "recoil";

type EditorMode = 'text' | 'circle';

type EditorModeState = {
  mode: EditorMode,
}

const editorModeState = atom<EditorModeState>({
  key: 'editorModeState',
  default: {
    mode: 'text',
  } as EditorModeState,
});

export const useEditorMode = () => {
  const [state, set] = useRecoilState(editorModeState);

  const startTextMode = () => set({ mode: 'text' });
  const startCircleMode = () => set({ mode: 'circle' });

  return {
    mode: state.mode,
    startTextMode,
    startCircleMode,
  }
}
