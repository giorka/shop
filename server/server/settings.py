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

LANGUAGE_CODE = 'ru-RU'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

AUTH_USER_MODEL = 'v1__auth.User'

STATIC_URL = 'static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CELERY_BROKER_URL = settings.broker_irl

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
