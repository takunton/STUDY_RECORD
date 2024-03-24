from database import Base
import sqlalchemy as sa


class User(Base):
    __tablename__ = "users"
    user_id = sa.Column("user_id", sa.Integer, primary_key=True, autoincrement=True)
    name = sa.Column("name", sa.Text, nullable=False)
    age = sa.Column("age", sa.Integer, nullable=False)
    email = sa.Column("email", sa.Text, nullable=False)