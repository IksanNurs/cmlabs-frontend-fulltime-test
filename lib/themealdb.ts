const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

type IngredientRaw = {
  idIngredient?: string;
  strIngredient?: string;
  strDescription?: string | null;
  strThumb?: string | null;
  strType?: string | null;
};

type MealSummaryRaw = {
  idMeal?: string;
  strMeal?: string;
  strMealThumb?: string;
};

export type Ingredient = {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  type: string;
};

export type MealSummary = {
  id: string;
  name: string;
  thumbnail: string;
};

export type MealDetail = {
  id: string;
  name: string;
  category: string;
  area: string;
  instructions: string;
  thumbnail: string;
  youtube: string;
  ingredients: string[];
  source: string;
  tags: string[];
};

async function fetchJSON<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Request failed for ${path}`);
  }

  return response.json() as Promise<T>;
}

export async function getIngredients(): Promise<Ingredient[]> {
  const data = await fetchJSON<{ meals: IngredientRaw[] }>('/list.php?i=list');

  return (data.meals ?? [])
    .filter((item): item is IngredientRaw => Boolean(item?.strIngredient))
    .map((item) => ({
      id: item.idIngredient ?? item.strIngredient ?? '',
      name: item.strIngredient?.trim() ?? '',
      description: item.strDescription?.trim() || 'Fresh ingredient collected from TheMealDB.',
      thumbnail: item.strThumb?.trim() || '',
      type: item.strType?.trim() || 'Ingredient',
    }))
    .filter((item) => item.name.length > 0);
}

export async function getMealsByIngredient(ingredient: string): Promise<MealSummary[]> {
  const data = await fetchJSON<{ meals: MealSummaryRaw[] | null }>(
    `/filter.php?i=${encodeURIComponent(ingredient)}`
  );

  return (data.meals ?? [])
    .filter((item): item is MealSummaryRaw => Boolean(item?.idMeal && item?.strMeal && item?.strMealThumb))
    .map((item) => ({
      id: item.idMeal as string,
      name: item.strMeal as string,
      thumbnail: item.strMealThumb as string,
    }));
}

export async function getMealById(mealId: string): Promise<MealDetail | null> {
  const data = await fetchJSON<{ meals: Array<Record<string, string | null>> | null }>(
    `/lookup.php?i=${encodeURIComponent(mealId)}`
  );

  const meal = data.meals?.[0];

  if (!meal) {
    return null;
  }

  const ingredients = Array.from({ length: 20 }, (_, index) => {
    const ingredient = meal[`strIngredient${index + 1}`];
    const measure = meal[`strMeasure${index + 1}`];

    if (!ingredient || !ingredient.trim()) {
      return null;
    }

    return `${ingredient.trim()}${measure && measure.trim() ? ` - ${measure.trim()}` : ''}`;
  }).filter((value): value is string => Boolean(value));

  return {
    id: meal.idMeal ?? mealId,
    name: meal.strMeal ?? 'Untitled meal',
    category: meal.strCategory ?? 'Uncategorized',
    area: meal.strArea ?? 'Unknown',
    instructions: meal.strInstructions ?? 'No instructions were provided.',
    thumbnail: meal.strMealThumb ?? '',
    youtube: meal.strYoutube ?? '',
    ingredients,
    source: meal.strSource ?? '',
    tags: meal.strTags?.split(',').map((tag) => tag.trim()).filter(Boolean) ?? [],
  };
}
