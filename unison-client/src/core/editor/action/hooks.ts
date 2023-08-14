import { KonvaEventObject } from 'konva/lib/Node';
import { useEditorElements } from '..';
import { useEditorMode } from '../mode/state';

export const useEditorAction = () => {
  const { mode, startTextEditMode } = useEditorMode();
  const { addText, addCircle } = useEditorElements();

  const handleClickCanvas = (e: KonvaEventObject<MouseEvent>) => {
    if (mode === 'text::insert') {
      const id = addText({
        x: e.evt.x,
        y: e.evt.y,
        text: 'hello',
      });

      startTextEditMode(id);
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
