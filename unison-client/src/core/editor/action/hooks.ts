import { KonvaEventObject } from 'konva/lib/Node';
import { useEditorElements } from '..';
import { useEditorMode } from '../mode/state';
import { useKeyPressEvent } from 'react-use';

// useEditorEvent ?
export const useEditorAction = () => {
  const { mode, startDefaultMode, startTextEditMode } = useEditorMode();
  const { addText, addCircle } = useEditorElements();

  const handleClickCanvas = (e: KonvaEventObject<MouseEvent>) => {
    if (mode === 'text::insert') {
      const id = addText({
        x: e.evt.x,
        y: e.evt.y,
        text: '',
      });

      startTextEditMode(id);
    } else if (mode === 'text::edit') {
      startDefaultMode();
    } else if (mode === 'circle::insert') {
      addCircle({
        x: e.evt.x,
        y: e.evt.y,
      });
    }
  };

  return {
    handleClickCanvas,
  };
};


export const useEditorKeyboardEvent = () => {
  const { startDefaultMode } = useEditorMode();

  useKeyPressEvent('Enter', () => {
    startDefaultMode();
  });
}

