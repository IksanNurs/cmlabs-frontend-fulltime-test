import { PageHeader } from '@/components/PageHeader';
import { IngredientMealsExplorer } from '@/components/IngredientMealsExplorer';

type IngredientDetailPageProps = {
  params: Promise<{
    ingredientName: string;
  }>;
};

export default async function IngredientDetailPage({ params }: IngredientDetailPageProps) {
  const { ingredientName } = await params;
  const decodedIngredient = decodeURIComponent(ingredientName);

  return (
    <main className="page-shell">
      <div className="content-card">
        <PageHeader
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Ingredients', href: '/ingredients' },
            { label: decodedIngredient },
          ]}
          title="Ingredients Detail"
          description="These meals were returned by the ingredient filter endpoint. Search locally to narrow the list before opening a meal detail page."
        />
        <div className="detail-banner">
          <span className="pill">Selected ingredient</span>
          <strong>{decodedIngredient}</strong>
        </div>
        <IngredientMealsExplorer ingredientName={decodedIngredient} />
      </div>
    </main>
  );
}
