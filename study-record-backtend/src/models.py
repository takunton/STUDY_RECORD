from database import Base
import sqlalchemy as sa

# DBのドメイン定義


# ユーザー
class User(Base):
    __tablename__ = "users"
    user_id = sa.Column("user_id", sa.Integer, primary_key=True, autoincrement=True)
    name = sa.Column("name", sa.Text, nullable=False)
    age = sa.Column("age", sa.Integer, nullable=False)
    email = sa.Column("email", sa.Text, nullable=False)

# 学習内容
class LearningContent(Base):
    __tablename__ = "learning_content"
    id = sa.Column(
        "id", sa.Integer, primary_key=True, autoincrement=True
    )
    seq = sa.Column("seq", sa.Integer, nullable=False)
    content_name = sa.Column("content_name", sa.Text, nullable=False)

# 記録
class Record(Base):
    __tablename__ = "record"
    id = sa.Column(
        "id", sa.Integer, primary_key=True, autoincrement=True
    )
    date = sa.Column("date", sa.Text, nullable=False)
    learning_content_id = sa.Column("learning_content_id", sa.Integer, nullable=False)
    time = sa.Column("time", sa.Integer, nullable=False)