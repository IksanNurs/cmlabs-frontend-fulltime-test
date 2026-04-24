'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getMealById, type MealDetail } from '@/lib/themealdb';

type Props = {
  mealId: string;
};

function toYoutubeEmbed(url: string) {
  const match = url.match(/(?:v=|youtu\.be\/)([\w-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : '';
}

export function MealDetailExplorer({ mealId }: Props) {
  const [meal, setMeal] = useState<MealDetail | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const data = await getMealById(mealId);

        if (!active) return;

        if (!data) {
          setMeal(null);
          setStatus('error');
          return;
        }

        setMeal(data);
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
  }, [mealId]);

  if (status === 'loading') {
    return <div className="skeleton" style={{ minHeight: 420 }} />;
  }

  if (status === 'error' || !meal) {
    return <div className="empty-state">Meal detail could not be loaded for id {mealId}.</div>;
  }

  const embedUrl = toYoutubeEmbed(meal.youtube);

  return (
    <section className="detail-layout">
      <div className="detail-media">
        <div className="detail-image">
          <Image src={meal.thumbnail} alt={meal.name} width={900} height={900} priority />
        </div>

        {embedUrl ? (
          <div className="detail-video">
            <iframe
              src={embedUrl}
              title={`${meal.name} tutorial`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ) : null}
      </div>

      <div className="detail-copy">
        <div>
          <div className="meta-row">
            <span className="pill">{meal.category}</span>
            <span className="pill">{meal.area}</span>
            {meal.tags.map((tag) => (
              <span key={tag} className="pill">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="hero-title" style={{ marginTop: '14px' }}>
            {meal.name}
          </h1>
        </div>

        <div className="section">
          <h2>Instructions</h2>
          <p>{meal.instructions}</p>
        </div>

        <div className="section">
          <h2>Recipe</h2>
          <ul className="ingredients-list">
            {meal.ingredients.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        {meal.source ? (
          <div className="section">
            <h2>Reference</h2>
            <p>
              Source link:{' '}
              <a href={meal.source} target="_blank" rel="noreferrer">
                {meal.source}
              </a>
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
