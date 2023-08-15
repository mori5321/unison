import { Stage, Layer, Circle, Image, Text, Group } from 'react-konva';
import { Html } from 'react-konva-utils';
import { isCircle, isRectangle, isText, useEditorElements } from '../../core/editor';
import { Toolbox } from '../../features/Toolbox';

import styles from './EditorPage.module.css';
import { exhaustiveUnionCheck } from '../../utils/union';
import { useEffect } from 'react';
import { useCanvasArea } from '../EditorsPage/useCanvasArea';
import { useEditorAction } from '../../core/editor/action/hooks';
import { useEditorMode } from '../../core/editor/mode/state';
import { EditableText } from '../../features/EditorElement/EditableText';

const CanvasAreaWidth = window.innerWidth;
const CanvasAreaHeight = window.innerHeight;

type Coord = {
  readonly x: number;
  readonly y: number;
};

type CanvasAreaCoords = {
  readonly topLeft: Coord;
  readonly topRight: Coord;
  readonly bottomLeft: Coord;
  readonly bottomRight: Coord;
};

export const canvasAreaCoords: CanvasAreaCoords = {
  topLeft: {
    x: 0,
    y: 0,
  },
  topRight: {
    x: CanvasAreaWidth,
    y: 0,
  },
  bottomLeft: {
    x: 0,
    y: CanvasAreaHeight,
  },
  bottomRight: {
    x: CanvasAreaWidth,
    y: CanvasAreaHeight,
  },
};

type EditorPageProps = {
  readonly id: string;
};
export const EditorPage = ({ id }: EditorPageProps) => {
  const { elements, image, onImageSelected, initById, cleanup } = useEditorElements();

  const { canvasArea } = useCanvasArea();

  const { handleClickCanvas } = useEditorAction();

  const { isTargetElement } = useEditorMode();

  useEffect(() => {
    let ignore = false;

    if (ignore) return;

    initById(id).then(() => {
      ignore = true;
    });

    return () => {
      cleanup();
      ignore = false;
    };
  }, [id]);

  return (
    <div className={styles.wrapper}>
      <div>
        {image ? (
          <div className={styles.canvasWrapper}>
            <Stage width={canvasArea.w} height={canvasArea.h} onClick={handleClickCanvas}>
              <Layer>
                {image && (
                  <Image
                    image={image}
                    x={canvasArea.w / 2 - image.width / 2}
                    y={canvasArea.h / 2 - image.height / 2}
                    width={image.width}
                    height={image.height}
                  />
                )}
              </Layer>
              <Layer>
                {elements.map((element, index) => {
                  if (isCircle(element)) {
                    return (
                      <Circle
                        key={index}
                        x={element.x}
                        y={element.y}
                        radius={element.radius}
                        fill={isTargetElement(element) ? 'red' : element.color} /* FIXME: This is for debug*/
                      />
                    );
                  } else if (isText(element)) {
                    return <EditableText element={element} isTargetElement={isTargetElement(element)} />;
                  } else if (isRectangle(element)) {
                    return null;
                  } else {
                    exhaustiveUnionCheck(element);
                  }
                })}
              </Layer>
            </Stage>
          </div>
        ) : (
          <div className={styles.imageSelectWrapper}>
            <input type="file" accept="image/*" onChange={onImageSelected} />
          </div>
        )}
      </div>

      <div className={styles.toolboxWrapper}>
        <Toolbox />
      </div>
    </div>
  );
};
