import { EditorPage } from './pages/EditorPage';
import { EditorsPage } from './pages/EditorsPage';
import { Route } from 'wouter';

function App() {
  return (
    <>
      <Route path="/" component={EditorsPage} />
      <Route path="/editor/:id" component={EditorPage} />
    </>
  );
}

export default App;
