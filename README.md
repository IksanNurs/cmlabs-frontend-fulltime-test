# CMLABS Front-End Practical Test

Project ini adalah implementasi Next.js untuk tes praktik front-end CMLABS menggunakan TheMealDB API.

## Fitur

- Halaman ingredients dengan search di sisi frontend
- Halaman detail ingredient dengan filter meal dan search di sisi frontend
- Halaman detail meal dengan gambar, instruksi, daftar recipe, dan embed YouTube
- Layout responsif untuk desktop, iPad, dan mobile
- Komponen atomic yang reusable

## Checklist Requirement

- [x] Menggunakan Next.js
- [x] Halaman Ingredients
- [x] Fitur search ingredient di sisi frontend
- [x] Klik ingredient mengarah ke halaman detail ingredient
- [x] Halaman Ingredients Detail
- [x] Fitur search meal di sisi frontend
- [x] Klik meal mengarah ke halaman detail meal
- [x] Halaman Meals Detail (opsional) sudah diimplementasikan
- [x] Responsif di desktop, iPad, dan mobile
- [x] README tersedia untuk panduan menjalankan project
- [x] Production build sudah diverifikasi dengan `npm run build`

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- App Router

## Route

- `/` - halaman utama
- `/ingredients` - daftar ingredients
- `/ingredients/[ingredientName]` - daftar meal berdasarkan ingredient
- `/meals/[mealId]` - detail meal

## Struktur Project

- `app/` - route dan global styles
- `components/` - komponen UI reusable
- `lib/themealdb.ts` - helper data dari TheMealDB
- `public/` - aset statis jika dibutuhkan nanti

## Menjalankan Project Secara Lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Production Build

```bash
npm run build
npm run start
```

## API yang Dipakai

- List of ingredients: `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
- Filter by ingredient: `https://www.themealdb.com/api/json/v1/1/filter.php?i={ingredient-name}`
- Meal detail: `https://www.themealdb.com/api/json/v1/1/lookup.php?i={meal-id}`

## Catatan

- Project ini bisa di-clone dan dijalankan langsung tanpa konfigurasi tambahan.
- Thumbnail meal sudah dikonfigurasi di `next.config.mjs`.
- Search ingredient dan meal berjalan di frontend setelah data selesai dimuat.
- Route detail meal menggunakan endpoint lookup yang bersifat bonus.
