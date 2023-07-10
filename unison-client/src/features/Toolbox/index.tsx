import { useEditorElements } from '../../core/editor';
import { canvasAreaCoords } from '../../pages/EditorPage';
import styles from './index.module.css'

export const Toolbox = () => {
  const { addCircle, addText } = useEditorElements();
  
  const handleClickAddCircle = () => {
    const x = Math.floor(Math.random() * canvasAreaCoords.topRight.x)
    const y = Math.floor(Math.random() * canvasAreaCoords.bottomLeft.y)
    addCircle({ x, y })
  }

  const handleClickAddText = () => {
    const x = Math.floor(Math.random() * canvasAreaCoords.topRight.x)
    const y = Math.floor(Math.random() * canvasAreaCoords.bottomLeft.y);
    addText({ x, y, text: 'Hello' })
  }
  
  return (
    <div className={styles.toolbox}>
      <MockIcon text={"C"} onClick={handleClickAddCircle}/>
      <MockIcon text={"T"} onClick={handleClickAddText} />
    </div>
  )
}


type MockIconProps = {
  readonly text: string
  readonly onClick?: () => void;
}
function MockIcon({ text, onClick }: MockIconProps) {
  return (
    <div className={styles.mockIcon} onClick={onClick}>
      {text}
    </div>
  )
}
