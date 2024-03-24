from pydantic import BaseModel
from typing import List, Optional

# python側のドメイン定義

# ユーザー
class UserBase(BaseModel):
    name: str
    age: int
    email: str

    class Config:
        orm_mode = True


class UserPublic(UserBase):
    user_id: int
    name: str
    age: int
    email: str


class UserCreate(UserBase):
    user_id: int
    name: str
    age: int
    email: str


class UserUpdate(UserBase):
    user_id: int
    name: str
    age: int
    email: str


class UserDelete(UserBase):
    user_id: int
    name: str
    age: int
    email: str
    
# 学習内容
class LearningContentBase(BaseModel):
    learning_content_id: int
    seq: int
    content_name: str

    class Config:
        orm_mode = True
