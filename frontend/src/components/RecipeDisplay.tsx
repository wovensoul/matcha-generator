import { Recipe } from "@/types/recipe";

interface RecipeDisplayProps {
  recipe: Recipe | null;
}

export default function RecipeDisplay({ recipe }: RecipeDisplayProps) {
  if (!recipe) return null;

  const { title, ingredients, steps } = recipe;

  return (
    <section className="mt-8 bg-[var(--green-secondary)] rounded-md px-4 py-6 shadow-inner text-[var(--green-text)] sm:px-6">
      <h2 className="mb-3 text-xl font-semibold">{title}</h2>

      <div className="mb-4">
        <h3 className="font-semibold mb-1">Ingredients:</h3>
        <ul className="list-disc list-inside">
          {ingredients.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">Instructions:</h3>
        <ol className="list-decimal list-inside space-y-2">
          {steps.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}
