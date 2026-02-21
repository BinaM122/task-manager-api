# Task Manager API

A production-style RESTful API for managing tasks, built with **FastAPI**, **SQLAlchemy**, and **SQLite**.

## Features

- Full CRUD functionality (Create, Read, Update, Delete)
- Data validation and serialization with Pydantic
- Persistent storage with SQLAlchemy ORM and SQLite
- Auto-generated interactive API documentation (Swagger UI + ReDoc)
- Clean layered architecture separating routes, business logic, and database

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | FastAPI |
| Database ORM | SQLAlchemy |
| Validation | Pydantic |
| Database | SQLite |
| Server | Uvicorn |

## Project Structure
```
task_manager/
├── main.py         # FastAPI app and route definitions
├── database.py     # Database connection and session management
├── models.py       # SQLAlchemy database models
├── schemas.py      # Pydantic schemas for input/output validation
├── crud.py         # Database operations
└── requirements.txt
```

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/task-manager-api.git
cd task-manager-api
```

### 2. Create and activate a virtual environment
```bash
python -m venv venv

# Mac/Linux
source venv/bin/activate

# Windows
venv\Scripts\activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Run the server
```bash
uvicorn main:app --reload
```

### 5. Open the docs
- Swagger UI: http://127.0.0.1:8000/docs
- ReDoc: http://127.0.0.1:8000/redoc

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/tasks` | Create a new task |
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/{id}` | Get a single task |
| PUT | `/tasks/{id}` | Update a task |
| DELETE | `/tasks/{id}` | Delete a task |

## Data Model
```json
{
  "id": 1,
  "title": "Build my first API",
  "description": "Using FastAPI and SQLAlchemy",
  "completed": false,
  "created_at": "2024-01-01T12:00:00"
}
```

## Author

Bina Mbodji— [https://github.com/BinaM122]