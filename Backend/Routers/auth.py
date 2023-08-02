import random
from typing import Annotated

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException
import sqlalchemy
from Utils.auth_utils import verification, generate_token
from schemas.schemas import LoginUser, RegisterUser, UserCode
from services.email import EmailService
from services.user import UserService
from Utils.dependens import email_service, user_service

auth_router = APIRouter(prefix='/auth', tags=['Auth'])

codes = {}


@auth_router.post('/login', response_model=str)
async def login(user: LoginUser, user_service: Annotated[UserService, Depends(user_service)]):
    try:
        db_user = await user_service.get_user(user.username)
    except Exception:
        raise HTTPException(
            status_code=401, detail="Incorrect username or password")
    if not verification(user.password, db_user.password, db_user.salt):
        raise HTTPException(
            status_code=401, detail="Incorrect username or password")
    return generate_token(user.username)


@auth_router.post('/register', response_model=bool)
async def register(user: RegisterUser, user_service: Annotated[UserService, Depends(user_service)]):
    if int(user.code) != codes[user.username]:
        raise HTTPException(status_code=401, detail="Incorrect code")
    try:
        await user_service.create_user(user)
    except sqlalchemy.exc.IntegrityError:
        raise HTTPException(
            status_code=409, detail='This username or email already exist')
    return True


@auth_router.post('/register/code')
async def code(us: UserCode, back_task: BackgroundTasks, email: Annotated[EmailService, Depends(email_service)]):
    code = random.randint(10000, 99000)
    print(code)
    back_task.add_task(email.send_email, us.email, code)
    codes[us.username] = code