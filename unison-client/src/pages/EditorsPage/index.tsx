import { Suspense } from 'react';
import { useEditors } from '../../core/editors/state';
import styles from './EditorsPage.module.css';
import { Link } from 'wouter';


export const EditorsPage = () => {
  const { editors } = useEditors();

  // const [editorsResource] = useState(() => 
  //   Loadable(list())
  // );


  return (
    <div className={styles.wrapper}>
      <Suspense fallback={<div>Loading...</div>}>
        <EditorsListDraft editors={editors} />
      </Suspense>
    </div>
  );
};

type EditorListProps = {
  editors: { id: string }[]
}
const EditorsListDraft = ({ editors }: EditorListProps) => {
  const { create } = useEditors();

  const handleClickCreate = async () => create()

  return (
    <div>
      <div>
      {
        editors.map(editor => (
          <div key={editor.id} className={styles.link}>
            <Link to={`/editors/${editor.id}`}>
              {editor.id}
            </Link>
          </div>
        ))
      }
      </div>
      <div className={styles.addEditor}>
        <button
          className={styles.startButton}
          onClick={handleClickCreate}
        >
          Add Editor
        </button>
      </div>
    </div>
  )
}

