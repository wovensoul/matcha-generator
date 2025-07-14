from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ValidationError
from typing import List
import os
import json
import re
from dotenv import load_dotenv
from huggingface_hub import InferenceClient

load_dotenv()

HF_TOKEN = os.getenv("HF_TOKEN")
print("HF_TOKEN loaded:", bool(HF_TOKEN))  # Debug

client = InferenceClient(api_key=HF_TOKEN)

app = FastAPI()

# Allow frontend access (adjust URL as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Models ---

class IngredientsInput(BaseModel):
    ingredients: str

class RecipeResponse(BaseModel):
    title: str
    ingredients: List[str]
    steps: List[str]

# --- Utility function ---

def clean_response(raw_text: str) -> str:
    """
    Remove markdown code fences (``` or ```json) from the AI response.
    """
    cleaned = re.sub(r"```(?:json)?\n?(.*?)```", r"\1", raw_text, flags=re.DOTALL).strip()
    return cleaned

# --- Routes ---

@app.get("/")
def root():
    return {"message": "Matcha AI backend is running!"}

@app.post("/generate")
def generate_recipe(data: IngredientsInput):
    prompt = f"""
You are a matcha drink recipe generator.

Given a list of ingredients, return a recipe in **JSON format** with the following structure:
{{
  "title": string,
  "ingredients": string[],
  "steps": string[]
}}

**Special rule**:
If any fruits are included (e.g., strawberry, blueberry, mango, peach, etc.), convert them into fruit syrups for the recipe.
In the ingredients list, replace the fresh fruit entries with their corresponding fruit syrups (e.g., instead of "strawberry", list "strawberry syrup").
Do NOT list both the fresh fruit and the syrup in the ingredients list.
Include clear instructions for how to make each fruit syrup as part of the steps.

Do NOT include any introductory text or explanation outside the JSON object.

Ingredients: {data.ingredients}
"""
    try:
        completion = client.chat.completions.create(
            model="meta-llama/Llama-3.1-8B-Instruct",
            messages=[{"role": "user", "content": prompt}]
        )
        response_text = completion.choices[0].message["content"]

        # Clean AI response before parsing JSON
        cleaned_text = clean_response(response_text)

        parsed_json = json.loads(cleaned_text)

        # Validate response structure
        recipe = RecipeResponse(**parsed_json)
        return recipe.dict()

    except json.JSONDecodeError:
        return {"error": "AI response was not valid JSON."}
    except ValidationError as ve:
        return {"error": "Missing or invalid fields in recipe.", "details": ve.errors()}
    except Exception as e:
        return {"error": str(e)}
