import { Stage, Layer, Circle, Image, Text } from 'react-konva';
import { useEditorElements } from '../core/editor';
import { Toolbox } from '../features/Toolbox';

import styles from './EditorPage.module.css'

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
  const { circles, image, texts, onImageSelected } = useEditorElements();

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
                {circles.map((circle, index) => (
                  <Circle key={index} x={circle.x} y={circle.y} radius={50} fill={circle.color} />
                ))}
                {texts.map((text, index) => (
                  <Text key={index} x={text.x} y={text.y} text={text.text} fontSize={text.fontSize} fill={text.color} />
                ))}
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


