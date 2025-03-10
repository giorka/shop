from categories import CATEGORIES
from v1__auth.models import User

from django.core import validators
from django.db import models
from django.db.models import CASCADE

# TODO: комментарии перенести в DOCSTRING


class Product(models.Model):
    identifier = models.CharField(max_length=256, primary_key=True)  # Уникальное в рамках обоих сайтов
    title = models.CharField(max_length=256)  # Заголовок
    full_price = models.DecimalField(max_digits=10, decimal_places=2)  # Цена за упаковку в дробях
    item_price = models.DecimalField(max_digits=10, decimal_places=2)  # Цена в дробях
    package_count = models.IntegerField()
    sizes = models.CharField(max_length=64)
    currency = models.CharField(max_length=3)
    category = models.CharField(max_length=64)
    qrcode = models.ImageField(upload_to='qr/')
    created_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name: str = 'Продукт'
        verbose_name_plural: str = 'Продукты'


class Preview(models.Model):
    identifier = models.CharField(
        max_length=256,
        unique=True,
    )  # Уникальное в рамках названия цвета и ID товара
    title = models.CharField(max_length=256)  # Заголовок-название цвета
    image = models.ImageField(upload_to='images/')  # Путь к изображению на сервере
    product = models.ForeignKey(to=Product, related_name='previews', on_delete=CASCADE)

    class Meta:
        verbose_name: str = 'Изображение'
        verbose_name_plural: str = 'Изображения'


class CartPreview(models.Model):
    preview = models.ForeignKey(Preview, on_delete=models.CASCADE)
    count = models.PositiveIntegerField()
    likes = models.ManyToManyField(to=User, related_name='cart')


class CategoryMarkup(models.Model):
    category = models.CharField(
        max_length=32,
        primary_key=True,
        choices=[(key, key) for key in CATEGORIES.keys()],
    )
    markup = models.IntegerField(validators=(validators.MinValueValidator(0),))

    def __str__(self) -> str:
        return f'{self.category} {self.markup}%'


class Order(models.Model):
    user = models.ForeignKey(to=User, related_name='orders', on_delete=CASCADE)
    content = models.ManyToManyField(to=Preview)
