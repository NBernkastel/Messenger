from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from starlette.middleware.cors import CORSMiddleware
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from Utils.config import ORIGINS, REDIS_HOST
from Routers.auth import auth_router
from Routers.user import users_router
from Routers.sockets import socket_router
from redis import asyncio as aioredis

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event('startup')
async def startup():
    redis = aioredis.from_url(REDIS_HOST)
    FastAPICache.init(RedisBackend(redis),prefix="fastapi-cache")

app.include_router(auth_router)
app.include_router(socket_router)
app.include_router(users_router)