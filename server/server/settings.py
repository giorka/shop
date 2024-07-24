from __future__ import annotations

import os
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # DJANGO
    secret_key: str = 'secret-key'
    debug: bool = True

    # DB
    db_engine: str = 'postgresql'
    db_name: str = 'db'
    db_user: str = 'admin'
    db_password: str = 'admin'
    db_host: str = 'localhost'
    db_port: str = '5432'

    # BROKER
    broker_irl: str = 'redis://localhost:6379/0'

    s3: bool = False
    s3_key_id: str = 's3-key-id'
    s3_access_key: str = 's3-access-key'
    s3_bucket_name: str = 's3-bucket-name'
    s3_endpoint_url: str = 'https://user-id.r2.cloudflarestorage.com'
    s3_custom_domain: str = 's3-custom-domain'

    model_config = SettingsConfigDict(env_file='.env')


settings = Settings()

DEBUG = settings.debug

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = settings.secret_key

ALLOWED_HOSTS = ['*']

# CSRF_TRUSTED_ORIGINS = ["https://kidsland-store.com", "http://kidsland-store.com", "http://localhost:3000"]

# CORS_ORIGIN_WHITELIST = ("https://kidsland-store.com", "http://kidsland-store.com", "http://localhost:3000", "http://0.0.0.0:3000", "http://127.0.0.1:3000")
CORS_ORIGIN_ALLOW_ALL = True
СORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_METHODS = (
    "GET",
    "POST",
    "OPTIONS",
    "DELETE"
)
CORS_ALLOW_HEADERS = [
    "accept",
    "accept-encoding",
    "authorization",
    "content-type",
    "dnt",
    "origin",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Credentials',
    "Access-Control-Allow-Origin"
]

DJANGO_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
)

APPS = (
    'v1',
    'v1__products',
    'v1__auth',
)

INSTALLED_APPS = (
    *DJANGO_APPS,
    *APPS,
    'djoser',
    'rest_framework.authtoken',
    "corsheaders"
)

MIDDLEWARE = (
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'server.urls'

TEMPLATES = (
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
)

WSGI_APPLICATION = 'server.wsgi.application'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': ('rest_framework.authentication.TokenAuthentication',),
}

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.' + settings.db_engine,
        'NAME': settings.db_name,
        'USER': settings.db_user,
        'PASSWORD': settings.db_password,
        'HOST': settings.db_host,
        'PORT': settings.db_port,
    },
}

AUTH_PASSWORD_VALIDATORS = (
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
)

DJOSER = {
    'LOGIN_FIELD': 'email',
}

LANGUAGE_CODE = 'ru-RU'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

AUTH_USER_MODEL = 'v1__auth.User'

STATIC_URL = "/api/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

MEDIA_URL = "/api/media/"
MEDIA_ROOT = BASE_DIR / "mediafiles"

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


CELERY_BROKER_URL = settings.broker_irl


AWS_ACCESS_KEY_ID = settings.s3_key_id
AWS_SECRET_ACCESS_KEY = settings.s3_access_key
AWS_STORAGE_BUCKET_NAME = settings.s3_bucket_name
AWS_S3_ENDPOINT_URL = settings.s3_endpoint_url
AWS_S3_CUSTOM_DOMAIN = settings.s3_custom_domain

if settings.s3:
    DEFAULT_FILE_STORAGE = 'storages.backends.s3.S3Storage'
