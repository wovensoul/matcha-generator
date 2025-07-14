// src/app/api/test/route.ts
import { InferenceClient } from "@huggingface/inference";

export async function POST(req: Request) {
  const HF_TOKEN = process.env.HF_TOKEN;
  if (!HF_TOKEN) {
    return new Response(JSON.stringify({ error: "Missing HF_TOKEN in environment" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await req.json();
  const ingredients = body.ingredients;

  if (typeof ingredients !== "string" || ingredients.trim() === "") {
    return new Response(JSON.stringify({ error: "Invalid or missing ingredients string" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const prompt = `
You are a matcha drink recipe generator.

Given a list of ingredients, return a complete recipe in JSON format with the following structure:
{
  "title": string,
  "ingredients": string[],
  "steps": string[]
}

**Important:** The steps field must be a non-empty array of detailed instructions on how to prepare the recipe.

**Special rule:**
If fruits are included (e.g., strawberry, blueberry), replace them with their syrup versions and include syrup preparation steps.

Do NOT include any text outside the JSON object.

Ingredients: ${ingredients}
`.trim();

  try {
    const client = new InferenceClient(HF_TOKEN);
    const response = await client.chatCompletion({
      model: "meta-llama/Llama-3.1-8B-Instruct",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // Step 1: Extract content string
    const raw = response.choices?.[0]?.message?.content ?? "";

    // Step 2: Clean markdown fences (```json ... ```)
    const cleaned = raw.replace(/```(?:json)?\n?([\s\S]*?)```/, "$1").trim();

    // Step 3: Parse JSON
    const parsed = JSON.parse(cleaned);

    // Step 4: Validate basic structure
    if (
      typeof parsed.title !== "string" ||
      !Array.isArray(parsed.ingredients) ||
      !Array.isArray(parsed.steps)
    ) {
      return new Response(
        JSON.stringify({ error: "Invalid recipe format", details: parsed }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
