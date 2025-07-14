## Matcha AI Recipe Generator — Docker Setup

This project contains two parts:  
- Backend: FastAPI server (in backend/ folder)  
- Frontend: Next.js app (in frontend/ folder)


## 1. Run Both Frontend & Backend Together Using Docker Compose

From the project root (where docker-compose.yml is located), run:

docker-compose up --build

This will build and start both services:

- Backend: accessible at http://localhost:8000  
- Frontend: accessible at http://localhost:3000

To stop and remove containers:

docker-compose down


## 2. Run Frontend and Backend Separately in Their Own Containers

### Backend

cd backend  
docker build -t backend .  
docker run -d -p 8000:8000 --env-file .env --name backend-container backend

### Frontend

cd frontend  
docker build -t frontend .  
docker run -d -p 3000:3000 --name frontend-container frontend

### Stopping and Removing Separate Containers

docker stop backend-container frontend-container  
docker rm backend-container frontend-container

## Notes

- When running separately, your frontend should call the backend API at http://localhost:8000.  
- When using Docker Compose, the frontend can call the backend API at http://backend:8000 (Docker’s internal network hostname).  
- Make sure your .env file with environment variables (like HF_TOKEN) is present in the backend folder for Docker to load.
