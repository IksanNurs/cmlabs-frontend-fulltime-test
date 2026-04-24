'use client';

import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { SearchField } from './SearchField';
import { getIngredients, type Ingredient } from '@/lib/themealdb';

export function IngredientsExplorer() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const data = await getIngredients();

        if (!active) return;

        setIngredients(data);
        setStatus('ready');
      } catch {
        if (active) {
          setStatus('error');
        }
      }
    }

    load();

    return () => {
      active = false;
    };
  }, []);

  const filteredIngredients = useMemo(() => {
    const normalized = deferredQuery.trim().toLowerCase();

    if (!normalized) {
      return ingredients;
    }

    return ingredients.filter((item) => item.name.toLowerCase().includes(normalized));
  }, [deferredQuery, ingredients]);

  if (status === 'loading') {
    return (
      <section className="grid" aria-label="Ingredients loading">
        <div className="toolbar">
          <div className="skeleton" style={{ minHeight: 84 }} />
          <div className="stats">
            <div className="skeleton" />
            <div className="skeleton" />
            <div className="skeleton" />
          </div>
        </div>
        <div className="grid ingredients-grid">
          <div className="skeleton" />
          <div className="skeleton" />
          <div className="skeleton" />
          <div className="skeleton" />
        </div>
      </section>
    );
  }

  if (status === 'error') {
    return <div className="empty-state">Failed to load ingredients. Please refresh the page.</div>;
  }

  return (
    <section className="grid" aria-label="Ingredients list">
      <div className="toolbar">
        <div>
          <SearchField
            value={query}
            onChange={setQuery}
            label="Search Ingredients by Name"
            placeholder="Type ingredient name, for example: chicken"
          />
        </div>
        <div className="stats">
          <div className="stat-card">
            <strong>{ingredients.length}</strong>
            <span>Total ingredients</span>
          </div>
          <div className="stat-card">
            <strong>{filteredIngredients.length}</strong>
            <span>Visible results</span>
          </div>
          <div className="stat-card">
            <strong>Responsive</strong>
            <span>Desktop, iPad, mobile</span>
          </div>
        </div>
      </div>

      {filteredIngredients.length > 0 ? (
        <div className="grid ingredients-grid">
          {filteredIngredients.map((ingredient) => (
            <Link
              key={ingredient.id}
              className="ingredient-card"
              href={`/ingredients/${encodeURIComponent(ingredient.name)}`}
            >
              <div className="ingredient-badge">{ingredient.name.slice(0, 2).toUpperCase()}</div>
              <div>
                <h3>{ingredient.name}</h3>
                <p>{ingredient.description}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty-state">No ingredient matches your search. Try a different keyword.</div>
      )}
    </section>
  );
}
