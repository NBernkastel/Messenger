from pydantic import BaseModel, EmailStr


class BaseUser(BaseModel):
    username: str
    password: str

    class Config:
        from_attributes = True


class RegisterUser(BaseUser):
    email: EmailStr
    code: str


class LoginUser(BaseUser):
    pass


class Message(BaseModel):
    body: str
    to: str


class UserCode(BaseModel):
    username: str
    email: EmailStr


class Username(BaseModel):
    username: str
