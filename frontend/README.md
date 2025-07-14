This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).  It serves as the frontend for a Matcha drink recipe generator, allowing users to input ingredients and get recipe suggestions.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## How It Works

- Enter your list of ingredients (comma-separated) in the input box.
- Click Generate Recipe.
- The frontend sends the request to a backend AI service that generates a matcha drink recipe based on the ingredients.
- The generated recipe with title, ingredients, and step-by-step instructions is displayed.

## Environment Variables

Make sure your backend is running and accessible (default expected at http://127.0.0.1:8000/generate).
If needed, update the fetch URL in app/page.tsx accordingly to point to your backend endpoint.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
