import { Stage, Layer, Circle, Image, Text } from 'react-konva';
import { isCircle, isRectangle, isText, useEditorElements } from '../../core/editor';
import { Toolbox } from '../../features/Toolbox';

import styles from './EditorPage.module.css'
import { exhaustiveUnionCheck } from '../../utils/union';
import {useEffect } from 'react';
import { useCanvasArea } from '../EditorsPage/useCanvasArea';

const CanvasAreaWidth = window.innerWidth;
const CanvasAreaHeight = window.innerHeight;

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


type EditorPageProps = {
  readonly id: string;
}
export const EditorPage = ({ id }: EditorPageProps) => {
  
  const { elements, image, onImageSelected, initById, cleanup } = useEditorElements();

  const { canvasArea } = useCanvasArea();

  

  useEffect(() => {
    let ignore = false;

    if (ignore) return;

    initById(id).then(() => {
      ignore = true;
    });

    return () => {
      cleanup();
      ignore = false
    }
  }, [id])

  return (
    <div className={styles.wrapper}>
      <div>
      {
        image ? (
          <div className={styles.canvasWrapper}>
            <Stage width={canvasArea.w} height={canvasArea.h} >
              <Layer>
                {image && <Image image={image} x={(canvasArea.w / 2) - (image.width / 4)} y={(canvasArea.h / 2) - (image.height / 4)} width={image.width / 2} height={image.height / 2}  />}
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
      </div>

      <div className={styles.toolboxWrapper}>
        <Toolbox />
      </div>
    </div >
  )
}


