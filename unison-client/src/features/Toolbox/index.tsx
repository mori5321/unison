// import { useEditorElements } from '../../core/editor';
import { useEditorMode } from '../../core/editor/mode/state';
// import { canvasAreaCoords } from '../../pages/EditorPage';
import { cx } from '../../utils/cssmod'
import styles from './index.module.css'

export const Toolbox = () => {
  // const { addCircle, addText } = useEditorElements();

  const { mode, startTextMode, startCircleMode } = useEditorMode();

  const handleClickCircleMode = () => {
    startCircleMode();
    // const x = Math.floor(Math.random() * canvasAreaCoords.topRight.x)
    // const y = Math.floor(Math.random() * canvasAreaCoords.bottomLeft.y)
    // addCircle({ x, y })
  }

  const handleClickTextMode = () => {
    startTextMode();
    // const x = Math.floor(Math.random() * canvasAreaCoords.topRight.x)
    // const y = Math.floor(Math.random() * canvasAreaCoords.bottomLeft.y);
    // addText({ x, y, text: 'Hello' })
  }

  return (
    <div className={styles.toolbox}>
      <MockIcon text={"C"} onClick={handleClickCircleMode} isActive={mode === 'circle'} />
      <MockIcon text={"T"} onClick={handleClickTextMode} isActive={mode === 'text'} />
    </div>
  )
}


type MockIconProps = {
  readonly text: string
  readonly onClick?: () => void;
  readonly isActive: boolean;
}
function MockIcon({ text, onClick, isActive }: MockIconProps) {
  return (
    <div className={
      cx(styles.mockIcon, isActive ? styles.active : '')
    } onClick={onClick}>
      {text}
    </div>
  )
}
