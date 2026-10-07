# 🏊 Swim App

A full-stack web app for swimmers to log their practices and generate new workouts. Built by a competitive swimmer and ocean lifeguard who wanted a better way to track training.

## Features

- ✅ REST API to create, view, update, and delete practices
- ✅ SQLite database with SQLModel
- 🚧 React frontend to view and log practices
- 🚧 Practice sets (reps, distance, stroke, interval)
- 🚧 Practice generator (pick yardage + focus, get a full workout)
- 🚧 User accounts and login
- 🚧 Stats dashboard (weekly yardage, totals by stroke)
- 🚧 Live deployment

## Tech Stack

**Frontend:** React, Vite, JavaScript, CSS
**Backend:** Python, FastAPI, SQLModel
**Database:** SQLite (local), PostgreSQL (production)
**Tools:** Git, GitHub, VS Code

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/practices` | Get all practices |
| GET | `/practices/{id}` | Get one practice |
| POST | `/practices` | Create a practice |
| PATCH | `/practices/{id}` | Update a practice |
| DELETE | `/practices/{id}` | Delete a practice |

## Running Locally

### Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```
API runs at `http://localhost:8000`. Interactive docs at `http://localhost:8000/docs`.

### Frontend
```bash
cd frontend
npm install
npm run dev
```
App runs at `http://localhost:5173`.

## Roadmap

Progress is tracked in [Issues](../../issues) and the project board.

## Author

**Tyler Krom** – Software Engineering student at UNCW
[GitHub](https://github.com/KromBomb)
