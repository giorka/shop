import copy
from pathlib import Path

import scrapy.utils.log
from colorlog import ColoredFormatter
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Django
    secret_key: str = 'secret-key'
    debug: bool = True

    # Database
    db_engine: str = 'postgresql'
    db_name: str = 'db'
    db_user: str = 'admin'
    db_password: str = 'admin'
    db_host: str = 'localhost'
    db_port: str = '5432'

    # Broker
    broker_irl: str = 'redis://localhost:6379/0'

    # S3
    s3: bool = False
    s3_key_id: str = 's3-key-id'
    s3_access_key: str = 's3-access-key'
    s3_bucket_name: str = 's3-bucket-name'
    s3_endpoint_url: str = 'https://user-id.r2.cloudflarestorage.com'
    s3_custom_domain: str = 's3-custom-domain'

    # Telegram
    tg_token: str
    tg_chat_id: str

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
)

APPS = (
    'server',
    'scraper',
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

STATIC_URL = 'api/static/'
STATIC_ROOT = BASE_DIR / "staticfiles"

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CELERY_BROKER_URL = settings.broker_irl

STORAGES = {
    'default': {'BACKEND': 'storages.backends.s3boto3.S3StaticStorage'},
    'staticfiles': {'BACKEND': 'django.core.files.storage.FileSystemStorage'},
}
AWS_ACCESS_KEY_ID = settings.s3_key_id
AWS_SECRET_ACCESS_KEY = settings.s3_access_key
AWS_STORAGE_BUCKET_NAME = settings.s3_bucket_name
AWS_S3_ENDPOINT_URL = settings.s3_endpoint_url
AWS_S3_CUSTOM_DOMAIN = settings.s3_custom_domain

DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

# Scrapy
BOT_NAME = 'scraper'

SPIDER_MODULES = ['scraper.spiders']
NEWSPIDER_MODULE = 'scraper.spiders'

ROBOTSTXT_OBEY = True

CONCURRENT_REQUESTS = 999_999

REQUEST_FINGERPRINTER_IMPLEMENTATION = '2.7'
TWISTED_REACTOR = 'twisted.internet.asyncioreactor.AsyncioSelectorReactor'
FEED_EXPORT_ENCODING = 'utf-8'

color_formatter = ColoredFormatter(
    (
        '%(log_color)s%(levelname)-5s%(reset)s '
        '%(yellow)s[%(asctime)s]%(reset)s'
        '%(white)s %(name)s %(funcName)s %(bold_purple)s:%(lineno)d%(reset)s '
        '%(log_color)s%(message)s%(reset)s'
    ),
    datefmt='%y-%m-%d %H:%M:%S',
    log_colors={
        'DEBUG': 'bold_blue',
        'INFO': 'bold_cyan',
        'WARNING': 'bold_red',
        'ERROR': 'bg_bold_red',
        'CRITICAL': 'red,bg_white',
    },
)

_get_handler = copy.copy(scrapy.utils.log._get_handler)


def _get_handler_custom(*args, **kwargs):
    handler = _get_handler(*args, **kwargs)
    handler.setFormatter(color_formatter)
    return handler


scrapy.utils.log._get_handler = _get_handler_custom

ITEM_PIPELINES = {'scraper.pipelines.DjangoPipeline': 300}
