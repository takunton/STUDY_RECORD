from pydantic import BaseModel
from typing import List, Optional

# python‘¤‚ÌƒhƒƒCƒ“’è‹`
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