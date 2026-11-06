import { Link } from 'react-router-dom';
import { usePageEnter } from '../hooks/usePageEnter';

export function NotFound() {
  const h1 = usePageEnter();
  return (
    <div className="page-hero">
      <h1 className="page-title" ref={h1} tabIndex={-1}>
        Page not found
      </h1>
      <p className="page-lede">This page does not exist.</p>
      <p>
        <Link className="more-link" to="/">
          <span className="arrow" aria-hidden="true">←</span> Back to the homepage
        </Link>
      </p>
    </div>
  );
}
