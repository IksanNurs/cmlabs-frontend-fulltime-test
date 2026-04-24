import { PageHeader } from '@/components/PageHeader';
import { MealDetailExplorer } from '@/components/MealDetailExplorer';

type MealDetailPageProps = {
  params: Promise<{
    mealId: string;
  }>;
};

export default async function MealDetailPage({ params }: MealDetailPageProps) {
  const { mealId } = await params;

  return (
    <main className="page-shell">
      <div className="detail-card">
        <PageHeader
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Ingredients', href: '/ingredients' },
            { label: 'Meal Detail' },
          ]}
          title="Meals Detail"
          description="Optional detail page completed: image, title, instructions, recipe list, and YouTube embed are all rendered from the lookup endpoint."
        />
        <div className="detail-banner">
          <span className="pill">Meal ID</span>
          <strong>{mealId}</strong>
        </div>
        <MealDetailExplorer mealId={mealId} />
      </div>
    </main>
  );
}
