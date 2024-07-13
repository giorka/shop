from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    first_name = last_name = None  # Удаляем поля
    email = models.EmailField(unique=True)

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    def __str__(self) -> str:
        return str(self.email)

    def save(self, *args, **kwargs) -> None:
        self.username = self.email
        super().save(*args, **kwargs)
