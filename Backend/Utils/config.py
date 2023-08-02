import os
from dotenv import load_dotenv

load_dotenv()

ORIGINS = os.getenv('ORIGINS')
DATABASE_URL = os.getenv('DATABASE_URL')
SECRET_KEY = os.getenv('SECRET_KEY')
EMAIL_USER = os.getenv('EMAIL_USER')
EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')
REDIS_HOST = os.getenv('REDIS_HOST')
APP_HOST = os.getenv('APP_HOST')
APP_PORT = int(os.getenv('APP_PORT'))