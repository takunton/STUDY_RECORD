from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from fastapi.middleware.cors import CORSMiddleware

from database import engine, get_db
import models
import schemas
import crud

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/learning-content-sample")
def read_learning_content():
    learing_content = [
        {"id": "LearningContent_1", "seq": 101, "contentName": "サンプル1"},
        {"id": "LearningContent_2", "seq": 102, "contentName": "サンプル2"},
        {"id": "LearningContent_3", "seq": 103, "contentName": "サンプル3"},
        {"id": "LearningContent_4", "seq": 104, "contentName": "サンプル4"},
        {"id": "LearningContent_5", "seq": 105, "contentName": "サンプル5"},
    ]
    return learing_content


@app.get("/record")
def read_record():
    records = [
        {
            "id": "record_1",
            "date": "2024-03-01",
            "LearningContent": {
                "id": "LearningContent_1",
                "seq": 101,
                "contentName": "サンプル1（出来たのか…）",
            },
            "time": 10,
        },
        {
            "id": "record_2",
            "date": "2024-03-02",
            "LearningContent": {
                "id": "LearningContent_2",
                "seq": 101,
                "contentName": "サンプル2",
            },
            "time": 20,
        },
        {
            "id": "record_3",
            "date": "2024-03-03",
            "LearningContent": {
                "id": "LearningContent_3",
                "seq": 101,
                "contentName": "サンプル3",
            },
            "time": 30,
        },
        {
            "id": "record_4",
            "date": "2024-03-04",
            "LearningContent": {
                "id": "LearningContent_4",
                "seq": 101,
                "contentName": "サンプル4",
            },
            "time": 40,
        },
        {
            "id": "record_5",
            "date": "2024-03-05",
            "LearningContent": {
                "id": "LearningContent_5",
                "seq": 101,
                "contentName": "サンプル5",
            },
            "time": 50,
        },
    ]
    return records

# ユーザー
@app.get("/user/{user_id}", response_model=schemas.UserPublic)
def get_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db=db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@app.get("/user/", response_model=List[schemas.UserPublic])
def get_all_user(db: Session = Depends(get_db)):
    db_users = crud.get_all_user(db=db)
    if db_users is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_users


@app.post("/user/create")
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.create_user(db=db, user=user)
    return user


@app.post("/user/{user_id}", response_model=schemas.UserPublic)
def update_user(user: schemas.UserUpdate, user_id: int, db: Session = Depends(get_db)):
    db_user = crud.update_user(db=db, user_id=user_id, user=user)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@app.post("/user/{user_id}/delete", response_model=schemas.UserPublic)
def update_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.delete_user(db=db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.get("/learning-content", response_model=List[schemas.LearningContentBase])
def get_all_user(db: Session = Depends(get_db)):
    db_learning_contents = crud.get_all_learning_content(db=db)
    if db_learning_contents is None:
        raise HTTPException(status_code=404, detail="LearningContent not found")
    return db_learning_contents
