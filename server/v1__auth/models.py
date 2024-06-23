from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    first_name = last_name = None  # Удаляем поля
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('username',)

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    def __str__(self) -> str:
        return self.Meta.verbose_name.lower()

    def save(self, *args, **kwargs) -> None:
        self.username = self.email
        super().save(*args, **kwargs)
