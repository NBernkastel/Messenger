from typing import Annotated
from fastapi import Depends, APIRouter
from fastapi.security import OAuth2PasswordBearer
from Utils.auth_utils import auth_user
import schemas.schemas as schemas
from services.user import UserService
from Utils.dependens import user_service, user_to_user
from fastapi_cache.decorator import cache

users_router = APIRouter(prefix='/users', tags=['Users'])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@users_router.get('/users', response_model=list[str])
@cache(expire=30)
async def get_users(user_service: Annotated[UserService, Depends(user_to_user)], token: str = Depends(oauth2_scheme)):
    usernames = await user_service.get_usernames(auth_user(token))
    return usernames


@users_router.get('/current_user')
@cache(expire=30)
async def get_current_user(user_service: Annotated[UserService, Depends(user_service)], token: str = Depends(oauth2_scheme)):
    user = await user_service.get_user(auth_user(token))
    return user


@users_router.post('/user_search')
async def find_user(name: schemas.Username, user_service: Annotated[UserService, Depends(user_service)]):
    if name.username != '':
        usernames = await user_service.user_searc(name.username)
        return usernames
    return []
