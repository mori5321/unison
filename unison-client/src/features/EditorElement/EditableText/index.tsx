import { EditorElementText } from '../../../core/editor/element/element';
import { Group, Text } from 'react-konva';
import { Html } from 'react-konva-utils';
import { useCanvasArea } from '../../../pages/EditorsPage/useCanvasArea';

type EditableTextProps = {
  readonly element: EditorElementText;
  readonly isTargetElement: boolean;
};
export const EditableText = ({ element, isTargetElement }: EditableTextProps) => {
  const { fromCenterOrigin } = useCanvasArea();

  // TODO: refactor tight coupling with useCanvasArea
  const { x, y } = fromCenterOrigin(element.x, element.y);

  return (
    <Group x={x} y={y} fontSize={element.fontSize}>
      {isTargetElement ? (
        <Html>
          <input />
        </Html>
      ) : (
        <Text text={element.text} fontSize={element.fontSize} />
      )}
    </Group>
  );
};
