from sqlalchemy import Boolean, Column, Integer, String, DateTime, func, ForeignKey

from .db_config import Base



class Message(Base):
    __tablename__ = "message"
    id = Column(Integer, primary_key=True, autoincrement=True)
    created_at = Column(DateTime, server_default=func.now())
    is_delete = Column(Boolean, default=False)
    body = Column(String(255), nullable=False)
    from_user = Column(String, ForeignKey('users.username'))
    to_user = Column(String, ForeignKey('users.username'))


class User(Base):
    __tablename__ = "users"
    username = Column(String(50), primary_key=True)
    password = Column(String(128))
    salt = Column(String)
    email = Column(String, unique=True)
    is_super_user = Column(Boolean, default=False)

class UserToUser(Base):
    __tablename__ = "user_to_user"
    id = Column(Integer, primary_key=True, autoincrement=True)
    first_user = Column(String, index=True)
    second_user = Column(String, index=True)
    have_dialog = Column(Boolean, default= False)
    