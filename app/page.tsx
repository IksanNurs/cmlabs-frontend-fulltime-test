import Link from 'next/link';

const highlights = [
  {
    title: 'Ingredients directory',
    description: 'Browse the master ingredient list with instant client-side search.',
    href: '/ingredients',
  },
  {
    title: 'Meal exploration',
    description: 'Open an ingredient to see filtered meals with photo cards.',
    href: '/ingredients/chicken_breast',
  },
  {
    title: 'Meal detail',
    description: 'Inspect a recipe with instructions, ingredients, and video embed.',
    href: '/meals/52772',
  },
];

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero hero-home">
        <div className="hero-copy">
          <span className="eyebrow">CMLABS FE-PT-02-2</span>
          <h1>Meal Ingredient Explorer</h1>
          <p>
            A polished Next.js implementation for the practical test, built around TheMealDB API
            with responsive layouts, atomic components, and fast front-end search.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/ingredients">
              Open Ingredients
            </Link>
            <Link className="button button-secondary" href="/meals/52772">
              View Sample Detail
            </Link>
          </div>
        </div>

        <div className="hero-panel">
          <div className="panel-chip">Next.js · TypeScript · Responsive UI</div>
          <div className="panel-grid">
            {highlights.map((item) => (
              <Link key={item.title} className="feature-card" href={item.href}>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="feature-row">
        <article className="feature-tile">
          <span className="feature-kicker">Required</span>
          <h3>Ingredients list and search</h3>
          <p>Browse the full ingredient directory from the API and narrow it instantly on the client side.</p>
        </article>
        <article className="feature-tile">
          <span className="feature-kicker">Required</span>
          <h3>Ingredient detail with meal filter</h3>
          <p>Select any ingredient to see meals that use it, then drill into the recipe cards.</p>
        </article>
        <article className="feature-tile">
          <span className="feature-kicker">Optional done</span>
          <h3>Meals detail page</h3>
          <p>The recipe detail includes image, instructions, ingredients, and embedded YouTube tutorial.</p>
        </article>
      </section>
    </main>
  );
}
