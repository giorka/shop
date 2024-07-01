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

    # CACHE
    redis_irl: str = 'redis://localhost:6379'

    # S3
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

DJANGO_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'storages',
    'django_filters',
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
)

MIDDLEWARE = (
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
    'DEFAULT_FILTER_BACKENDS': ('django_filters.rest_framework.DjangoFilterBackend',),
}

DJOSER = {
    'LOGIN_FIELD': 'email',
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

CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': settings.redis_irl.strip('/') + '/1',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        },
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

LANGUAGE_CODE = 'ru-RU'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

AUTH_USER_MODEL = 'v1__auth.User'

STATIC_URL = 'static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CELERY_BROKER_URL = settings.redis_irl.strip('/') + '/0'

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

AWS_ACCESS_KEY_ID = settings.s3_key_id
AWS_SECRET_ACCESS_KEY = settings.s3_access_key
AWS_STORAGE_BUCKET_NAME = settings.s3_bucket_name
AWS_S3_ENDPOINT_URL = settings.s3_endpoint_url
AWS_S3_CUSTOM_DOMAIN = settings.s3_custom_domain

if settings.s3:
    DEFAULT_FILE_STORAGE = 'storages.backends.s3.S3Storage'
