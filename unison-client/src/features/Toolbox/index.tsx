// import { useEditorElements } from '../../core/editor';
import { useEditorMode } from '../../core/editor/mode/state';
// import { canvasAreaCoords } from '../../pages/EditorPage';
import { cx } from '../../utils/cssmod';
import styles from './index.module.css';

export const Toolbox = () => {
  // const { addCircle, addText } = useEditorElements();

  const { isMode, startTextInsertMode, startCircleInsertMode, isCircleMode } = useEditorMode();

  const handleClickCircleMode = () => {
    startCircleInsertMode();
    // const x = Math.floor(Math.random() * canvasAreaCoords.topRight.x)
    // const y = Math.floor(Math.random() * canvasAreaCoords.bottomLeft.y)
    // addCircle({ x, y })
  };

  const handleClickTextMode = () => {
    startTextInsertMode();
    // const x = Math.floor(Math.random() * canvasAreaCoords.topRight.x)
    // const y = Math.floor(Math.random() * canvasAreaCoords.bottomLeft.y);
    // addText({ x, y, text: 'Hello' })
  };

  return (
    <div className={styles.toolbox}>
      <MockIcon text={'C'} onClick={handleClickCircleMode} isActive={isCircleMode} />
      <MockIcon text={'T'} onClick={handleClickTextMode} isActive={isMode('text::insert')} />
    </div>
  );
};

type MockIconProps = {
  readonly text: string;
  readonly onClick?: () => void;
  readonly isActive: boolean;
};
function MockIcon({ text, onClick, isActive }: MockIconProps) {
  return (
    <div className={cx(styles.mockIcon, isActive ? styles.active : '')} onClick={onClick}>
      {text}
    </div>
  );
}
