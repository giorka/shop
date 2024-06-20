from django.contrib.auth.models import AbstractUser
from django.db import models

from v1__products import models as v1__products_models


class User(AbstractUser):
    username = first_name = last_name = None  # Удаляем поля
    email = models.EmailField(primary_key=True)
    cart = models.ManyToManyField(to=v1__products_models.Product, related_name='likes')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('username',)

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    def __str__(self) -> str:
        return self.Meta.verbose_name.lower()
