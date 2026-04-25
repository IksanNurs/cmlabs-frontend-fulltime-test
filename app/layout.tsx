import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Meal Ingredient Explorer',
  description: 'Front-end practical task for CMLABS using Next.js and TheMealDB API.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="app-frame">
          <header className="site-header">
            <Link className="brand" href="/" aria-label="Meal Ingredient Explorer home">
              <span className="brand-mark">M</span>
              <span className="brand-copy">
                <strong>Meal Explorer</strong>
                <span>TheMealDB practical test</span>
              </span>
            </Link>

            <nav className="site-nav" aria-label="Primary">
              <Link href="/">Home</Link>
              <Link href="/ingredients">Ingredients</Link>
              <Link href="/meals/52772">Meals Detail</Link>
            </nav>
          </header>

          <div className="app-body">{children}</div>

          <footer className="site-footer">
            <span>Built for CMLABS FE-PT-02-2</span>
            <span>Responsive on desktop, tablet, and mobile</span>
          </footer>
        </div>
      </body>
    </html>
  );
}
