import { EditorElementText } from '../../../core/editor/element/element';
import { Group, Text } from 'react-konva';
import { Html } from 'react-konva-utils';

type EditableTextProps = {
  readonly element: EditorElementText;
  readonly isTargetElement: boolean;
};
export const EditableText = ({ element, isTargetElement }: EditableTextProps) => {
  return (
    <Group x={element.x} y={element.y} fontSize={element.fontSize}>
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
