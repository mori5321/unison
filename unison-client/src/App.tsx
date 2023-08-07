import { BasicLayout } from './layouts/BasicLayout';
import { EditorPage } from './pages/EditorPage';
import { EditorsPage } from './pages/EditorsPage';
import { Route } from 'wouter';

function App() {
  return (
    <BasicLayout>
      <Route path="/" component={EditorsPage} />
      <Route path="/editors/:id">
        {params => <EditorPage id={params.id} />}
      </Route>
    </BasicLayout>
  );
}

export default App;
