"use client";

import { useState } from "react";
import { Recipe } from "@/types/recipe";
import RecipeDisplay from "@/components/RecipeDisplay";

export default function HomePage() {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRecipe(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients }),
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();

      if (data.title && data.ingredients && data.steps) {
        setRecipe({
          title: data.title,
          ingredients: data.ingredients,
          steps: data.steps,
        });
      } else if (data.error) {
        setError(data.error);
      } else {
        setError("Unknown error occurred.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 bg-[var(--green-medium)] min-h-screen">
      <main className="max-w-xl mx-auto mt-8 p-6 rounded-lg shadow-md bg-[var(--green-light)] text-[var(--green-dark)] font-sans">
        <h1 className="text-center text-4xl font-extrabold mb-6">
          🍵 Matcha Recipe Generator
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <label className="text-lg font-semibold">
            Enter ingredients (comma separated):
            <input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="e.g. matcha powder, oat milk, honey"
              required
              className="mt-2 w-full p-3 text-base rounded-md border-2 border-[var(--green-border)] outline-none focus:border-[var(--green-primary)] transition-colors"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className={`p-3 text-lg font-bold rounded-md transition-colors ${
              loading
                ? "bg-[var(--green-medium)] cursor-not-allowed"
                : "bg-[var(--green-primary)] hover:bg-[var(--green-primary-hover)] cursor-pointer"
            } text-[var(--background)]`}
          >
            {loading ? "Generating..." : "Generate Recipe"}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-center font-semibold text-[var(--red-error)]">
            Error: {error}
          </p>
        )}

        {recipe && <RecipeDisplay recipe={recipe} />}
      </main>
    </div>
  );
}
