import { EditorElementText } from '../../../core/editor/element/element';
import { Group, Text } from 'react-konva';
import { Html } from 'react-konva-utils';
import { useCanvasArea } from '../../../pages/EditorsPage/useCanvasArea';
import { useEditorElements } from '../../../core/editor';

type EditableTextProps = {
  readonly element: EditorElementText;
  readonly isTargetElement: boolean;
};
export const EditableText = ({ element, isTargetElement }: EditableTextProps) => {
  const { fromCenterOrigin } = useCanvasArea();
  const { updateElement } = useEditorElements();
  // TODO: refactor tight coupling with useCanvasArea
  const { x, y } = fromCenterOrigin(element.x, element.y);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateElement({
      ...element,
      text: e.target.value,
    });
  };

  return (
    <Group x={x} y={y} fontSize={element.fontSize}>
      {isTargetElement ? (
        <Html>
          <input value={element.text} onChange={handleChangeInput} />
        </Html>
      ) : (
        <Text text={element.text} fontSize={element.fontSize} />
      )}
    </Group>
  );
};
