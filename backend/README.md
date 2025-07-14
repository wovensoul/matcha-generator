## Matcha Recipe Generator
This project is a FastAPI backend that generates unique matcha drink recipes using the Meta’s meta-llama/Llama-3.1-8B-Instruct model (via Hugging Face). Users provide ingredients, and the server responds with an AI-crafted recipe, ready to be used in apps or integrated with a visual frontend.  

Features:
-  AI-generated matcha recipes
-  Powered by Llama-3.1-8B-Instruct
-  FastAPI-based REST API

## Getting Started

### Set up your Hugging Face API token:
Create a .env file in the root of your project with the following content:

```HF_TOKEN=hf_your_actual_token_here```

### (Optional) Create and activate a virtual environment:
On Windows:
```bash
python -m venv venv
venv\Scripts\activate
```
On MacOs/Linux:
```bash
python3 -m venv venv
source venv/bin/activate

# to deactivate later
`deactivate`
```

### Install dependencies:
```pip install -r requirements.txt```

### Run the backend server (FastAPI + Uvicorn):
```uvicorn main:app --reload --port 8000```

Then open your browser to: [http://localhost:8000](http://localhost:8000)

