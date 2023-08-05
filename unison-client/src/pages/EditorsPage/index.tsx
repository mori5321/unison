import { Link } from 'wouter';

export const EditorsPage = () => {
  return (
    <div>
      <div>
        <button>create</button>
      </div>
      <div>List Here</div>
      <div>
        <Link href="/editor/hogehoge">to Editor Page</Link>
      </div>
    </div>
  );
};
