import { EditorElementText } from '../../../core/editor/element/element';
import { Group, Rect, Text } from 'react-konva';
import { Html } from 'react-konva-utils';
import { useCanvasArea } from '../../../pages/EditorsPage/useCanvasArea';
import { useEditorElements } from '../../../core/editor';
import { useEditorMode } from '../../../core/editor/mode/state';
import styles from './EditableText.module.css';

type EditableTextProps = {
  readonly element: EditorElementText;
  readonly isTargetElement: boolean;
};
export const EditableText = ({ element, isTargetElement }: EditableTextProps) => {
  const { fromCenterOrigin } = useCanvasArea();
  const { updateElement } = useEditorElements();
  const { startTextEditMode } = useEditorMode();
  // TODO: refactor tight coupling with useCanvasArea
  const { x, y } = fromCenterOrigin(element.x, element.y);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateElement({
      ...element,
      text: e.target.value,
    });
  };

  const handleClick = () => startTextEditMode(element.id) 

  return (
    <Group x={x} y={y} fontSize={element.fontSize}>
      {isTargetElement ? (
        <Html>
          <input value={element.text} onChange={handleChangeInput} className={styles.input} autoFocus />
        </Html>
      ) : (
        <Group>
          <Text text={element.text} fontSize={element.fontSize} onClick={handleClick} padding={4} border={1} />
        </Group>
      )}
        
    </Group>
  );
};
