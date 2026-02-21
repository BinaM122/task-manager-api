from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import engine, SessionLocal
import models
import schemas
import crud

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Task Manager API",
    description="A production-style REST API for managing tasks. Built with FastAPI, SQLAlchemy, and SQLite.",
    version="1.0.0",
    contact={
        "name": "Your Name",
        "email": "your@email.com",
    },
    license_info={
        "name": "MIT",
    }
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def root():
    return {"message": "Task Manager API is running"}

@app.post("/tasks", response_model=schemas.TaskResponse, status_code=201, tags=["Tasks"], summary="Create a new task")
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    return crud.create_task(db=db, task=task)

@app.get("/tasks", response_model=list[schemas.TaskResponse], tags=["Tasks"], summary="Get all tasks")
def get_tasks(db: Session = Depends(get_db)):
    return crud.get_tasks(db=db)

@app.get("/tasks/{task_id}", response_model=schemas.TaskResponse, tags=["Tasks"], summary="Get a single task by ID")
def get_task(task_id: int, db: Session = Depends(get_db)):
    task = crud.get_task(db=db, task_id=task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@app.put("/tasks/{task_id}", response_model=schemas.TaskResponse, tags=["Tasks"], summary="Update a task")
def update_task(task_id: int, task: schemas.TaskUpdate, db: Session = Depends(get_db)):
    updated_task = crud.update_task(db=db, task_id=task_id, task=task)
    if updated_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return updated_task

@app.delete("/tasks/{task_id}", status_code=204, tags=["Tasks"], summary="Delete a task")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    deleted_task = crud.delete_task(db=db, task_id=task_id)
    if deleted_task is None:
        raise HTTPException(status_code=404, detail="Task not found")