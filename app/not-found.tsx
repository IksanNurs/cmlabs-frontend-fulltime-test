import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="page-shell">
      <div className="content-card">
        <div className="empty-state">
          <h1 style={{ marginTop: 0 }}>Page not found</h1>
          <p>The requested ingredient or meal could not be found.</p>
          <Link className="button button-primary" href="/ingredients">
            Back to Ingredients
          </Link>
        </div>
      </div>
    </main>
  );
}
