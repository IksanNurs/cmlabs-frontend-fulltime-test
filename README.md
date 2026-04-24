# CMLABS Front-End Practical Test

Next.js implementation for the CMLABS FE practical test using TheMealDB API.

## Features

- Ingredients page with front-end search
- Ingredient detail page with meal filtering and front-end search
- Meal detail page with image, instructions, recipe list, and YouTube embed
- Responsive layout for desktop, iPad, and mobile
- Atomic, reusable components

## Requirement Checklist

- [x] Use Next.js
- [x] Page Ingredients
- [x] Front-end search for ingredients
- [x] Click ingredient redirects to ingredient detail page
- [x] Page Ingredients Detail
- [x] Front-end search for meals
- [x] Click meal redirects to meal detail page
- [x] Meals Detail optional page implemented
- [x] Responsive on desktop, iPad, and mobile
- [x] README included for running the project
- [x] Production build verified with `npm run build`

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- App Router

## Routes

- `/` - landing page
- `/ingredients` - list of ingredients
- `/ingredients/[ingredientName]` - meals filtered by ingredient
- `/meals/[mealId]` - meal detail page

## Project Structure

- `app/` - routes and global styles
- `components/` - reusable UI blocks
- `lib/themealdb.ts` - TheMealDB data helpers
- `public/` - static assets if needed later

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
npm run start
```

## API Used

- List of ingredients: `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
- Filter by ingredient: `https://www.themealdb.com/api/json/v1/1/filter.php?i={ingredient-name}`
- Meal detail: `https://www.themealdb.com/api/json/v1/1/lookup.php?i={meal-id}`

## Notes

- The project is safe to clone and run locally with no extra configuration.
- Meal thumbnails are served from TheMealDB and configured in `next.config.mjs`.
- Ingredient and meal searches run on the front-end after the data is loaded.
- The detail route uses the optional lookup endpoint and is implemented as a bonus.
