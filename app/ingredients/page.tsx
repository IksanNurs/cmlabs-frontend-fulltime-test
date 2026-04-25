import { PageHeader } from '@/components/PageHeader';
import { IngredientsExplorer } from '@/components/IngredientsExplorer';

export default function IngredientsPage() {
  return (
    <main className="page-shell">
      <div className="content-card">
        <PageHeader
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Ingredients' }]}
          title="Ingredients"
          description="Browse every ingredient from TheMealDB, complete with thumbnails, type labels, and descriptions. Use the search to quickly find an item, then open it to see meals that use it."
        />
        <IngredientsExplorer />
      </div>
    </main>
  );
}
