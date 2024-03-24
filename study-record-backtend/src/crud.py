from sqlalchemy.orm import Session
import models
import schemas

# user_idからデータを取り出す。
def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.user_id == user_id).first()

# データベース内全てのデータを取り出す。
def get_all_user(db: Session):
    return db.query(models.User).all()

# usersテーブルにデータを追加
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

# usersテーブルのデータ更新
def update_user(db: Session, user_id: int, user: schemas.UserUpdate):
    user_obj = get_user(db, user_id)
    if user_obj is not None:
        user_obj.name = user.name
        user_obj.age = user.age
        user_obj.email = user.email
        db.commit()
        db.refresh(user_obj)
    return user_obj

# usersテーブルのデータ削除
def delete_user(db: Session, user_id: int):
    user_obj = get_user(db, user_id)
    if user_obj is not None:
        db.delete(user_obj)
        db.commit()
    return user_obj