from typing import Tuple

from django.contrib.auth.models import AbstractUser
from django.db import models

from v1 import models as v1_models


class User(AbstractUser):
    username = first_name = last_name = date_joined = last_login = None  # Removing fields
    email = models.EmailField(unique=True)
    products = models.ManyToManyField(
        to=v1_models.Product,
        related_name='interests'
    )  # Custom grocery cart

    USERNAME_FIELD: str = 'email'
    REQUIRED_FIELDS: Tuple[str] = ('username',)

    class Meta:
        verbose_name: str = 'Пользователь'
        verbose_name_plural: str = 'Пользователи'
