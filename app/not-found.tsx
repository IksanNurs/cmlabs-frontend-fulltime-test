import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="page-shell">
      <section className="error-surface content-card">
        <div className="error-copy">
          <span className="eyebrow">404</span>
          <h1 className="headline">Page not found</h1>
          <p className="subheadline">
            The requested ingredient or meal could not be found. Let&apos;s get you back to the
            directory.
          </p>
        </div>

        <div className="error-actions">
          <Link className="button button-primary" href="/ingredients">
            Back to Ingredients
          </Link>
          <Link className="button button-secondary" href="/">
            Go Home
          </Link>
        </div>
      </section>
    </main>
  );
}
