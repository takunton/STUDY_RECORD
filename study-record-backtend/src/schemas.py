from pydantic import BaseModel
from typing import List, Optional

# python���̃h���C����`

# ���[�U�[
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
    
# �w�K���e
class LearningContentBase(BaseModel):
    id: int
    seq: int
    content_name: str

    class Config:
        orm_mode = True

# �L�^
class RecordBase(BaseModel):
    id: int
    date: str
    learning_content: Optional[LearningContentBase] 
    time: int

    class Config:
        orm_mode = True


