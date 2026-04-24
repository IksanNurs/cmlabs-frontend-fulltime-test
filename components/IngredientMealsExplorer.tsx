'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import { SearchField } from './SearchField';
import { getMealsByIngredient, type MealSummary } from '@/lib/themealdb';

type Props = {
  ingredientName: string;
};

export function IngredientMealsExplorer({ ingredientName }: Props) {
  const [meals, setMeals] = useState<MealSummary[]>([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const data = await getMealsByIngredient(ingredientName);

        if (!active) return;

        setMeals(data);
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
  }, [ingredientName]);

  const filteredMeals = useMemo(() => {
    const normalized = deferredQuery.trim().toLowerCase();

    if (!normalized) {
      return meals;
    }

    return meals.filter((item) => item.name.toLowerCase().includes(normalized));
  }, [deferredQuery, meals]);

  if (status === 'loading') {
    return (
      <section className="grid" aria-label="Meals loading">
        <div className="toolbar">
          <div className="skeleton" style={{ minHeight: 84 }} />
          <div className="stats">
            <div className="skeleton" />
            <div className="skeleton" />
            <div className="skeleton" />
          </div>
        </div>
        <div className="grid meals-grid">
          <div className="skeleton" />
          <div className="skeleton" />
          <div className="skeleton" />
        </div>
      </section>
    );
  }

  if (status === 'error') {
    return <div className="empty-state">Failed to load meals. Please refresh the page.</div>;
  }

  return (
    <section className="grid" aria-label="Meals list">
      <div className="toolbar">
        <div>
          <SearchField
            value={query}
            onChange={setQuery}
            label="Search Meal by Name"
            placeholder="Type meal name, for example: soup"
          />
        </div>
        <div className="stats">
          <div className="stat-card">
            <strong>{meals.length}</strong>
            <span>Meals for {ingredientName}</span>
          </div>
          <div className="stat-card">
            <strong>{filteredMeals.length}</strong>
            <span>Visible results</span>
          </div>
          <div className="stat-card">
            <strong>Detail ready</strong>
            <span>Tap a meal card</span>
          </div>
        </div>
      </div>

      {filteredMeals.length > 0 ? (
        <div className="grid meals-grid">
          {filteredMeals.map((meal) => (
            <Link key={meal.id} className="meal-card" href={`/meals/${meal.id}`}>
              <div className="meal-thumb">
                <Image src={meal.thumbnail} alt={meal.name} width={220} height={180} />
              </div>
              <div>
                <h3>{meal.name}</h3>
                <p>Open to see the full recipe, ingredients, and embedded tutorial video.</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty-state">No meal matches your search. Try a broader keyword.</div>
      )}
    </section>
  );
}
