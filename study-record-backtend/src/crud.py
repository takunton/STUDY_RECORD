from operator import le
from sqlalchemy.orm import Session
import models
import schemas

# user_id����f�[�^�����o���B
def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.user_id == user_id).first()

# �f�[�^�x�[�X���S�Ẵf�[�^�����o���B
def get_all_user(db: Session):
    return db.query(models.User).all()

# users�e�[�u���Ƀf�[�^��ǉ�
def create_user(db: Session, user: schemas.UserCreate):
    user_obj = models.User(
        name=user.name,
        age=user.age,
        email=user.email,
    )
    db.add(user_obj)
    db.commit()
    db.refresh(user_obj)
    return user_obj

# users�e�[�u���̃f�[�^�X�V
def update_user(db: Session, user_id: int, user: schemas.UserUpdate):
    user_obj = get_user(db, user_id)
    if user_obj is not None:
        user_obj.name = user.name
        user_obj.age = user.age
        user_obj.email = user.email
        db.commit()
        db.refresh(user_obj)
    return user_obj

# users�e�[�u���̃f�[�^�폜
def delete_user(db: Session, user_id: int):
    user_obj = get_user(db, user_id)
    if user_obj is not None:
        db.delete(user_obj)
        db.commit()
    return user_obj


# learning_content�e�[�u���S�Ẵf�[�^�����o���B
def get_all_learning_content(db: Session):
    return db.query(models.LearningContent).order_by((models.LearningContent.seq)).all()

# id����learning_content�e�[�u���̃f�[�^�����o���B
def get_learning_content(db: Session, id: int):
    return db.query(models.LearningContent).filter(models.LearningContent.id == id).first()

# learning_content�e�[�u���Ƀf�[�^��ǉ�
def create_learning_content(db: Session, learning_content: schemas.LearningContentBase):
    learning_content_obj = models.LearningContent(
        seq =learning_content.seq,
       content_name= learning_content.content_name
    )
    db.add(learning_content_obj)
    db.commit()
    db.refresh(learning_content_obj)
    return learning_content_obj

# learning_content�e�[�u���Ƀf�[�^���X�V
def update_learning_content(db: Session, learning_content: schemas.LearningContentBase):
    learning_content_obj= get_learning_content(db,learning_content.id)
    if learning_content_obj is not None:
        learning_content_obj.seq = learning_content.seq
        learning_content_obj.content_name = learning_content.content_name
        db.commit()
        db.refresh(learning_content_obj)
    return learning_content_obj

# users�e�[�u���̃f�[�^�X�V
def update_user(db: Session, user_id: int, user: schemas.UserUpdate):
    user_obj = get_user(db, user_id)
    if user_obj is not None:
        user_obj.name = user.name
        user_obj.age = user.age
        user_obj.email = user.email
        db.commit()
        db.refresh(user_obj)
    return user_obj

# Record�e�[�u���S�Ẵf�[�^�����o���B
def get_all_record(db: Session):
    return db.query(models.Record).all()
