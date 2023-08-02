import { Stage, Layer, Circle, Image, Text } from 'react-konva';
import { isCircle, isRectangle, isText, useEditorElements } from '../core/editor';
import { Toolbox } from '../features/Toolbox';

import styles from './EditorPage.module.css'
import { exhaustiveUnionCheck } from '../utils/union';

const CanvasAreaWidth = 1200;
const CanvasAreaHeight = 600;

type Coord = {
  readonly x: number;
  readonly y: number;
}

type CanvasAreaCoords = {
  readonly topLeft: Coord;
  readonly topRight: Coord;
  readonly bottomLeft: Coord;
  readonly bottomRight: Coord;
}


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
  }
}


export const EditorPage = () => {
  const { elements, image, onImageSelected } = useEditorElements();

  return (
    <div className={styles.wrapper}>
      {
        image ? (
          <div className={styles.canvasWrapper}>
            <Stage width={CanvasAreaWidth} height={CanvasAreaHeight} >
              <Layer>
                {image && <Image image={image} x={0} y={0} width={CanvasAreaWidth} height={CanvasAreaHeight} />}
              </Layer>
              <Layer>
                {elements.map((element, index) => {
                  if (isCircle(element)) {
                    return <Circle key={index} x={element.x} y={element.y} radius={50} fill={element.color} />
                  } else if (isText(element)) {
                    return <Text key={index} x={element.x} y={element.y} text={element.text} fontSize={element.fontSize} fill={element.color} />
                  } else if (isRectangle(element)) {
                    return null
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
        )
      }

      <div className={styles.toolboxWrapper}>
        <Toolbox />
      </div>
    </div >
  )
}


