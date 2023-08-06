import { useEditors } from '../../core/editors/state';
import styles from './EditorsPage.module.css';

export const EditorsPage = () => {
  return (
    <div className={styles.wrapper}>
      <NoData />
    </div>
  );
};

const NoData = () => {
  const { create } = useEditors();

  const handleClickCreate = async () => create()

  return (
    <div>
      <button
        className={styles.startButton}
        onClick={handleClickCreate}
      >
          Start your 1st Editor
      </button>
    </div>
  );
}

