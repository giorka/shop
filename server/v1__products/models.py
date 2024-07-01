from django.core import validators
from django.db import models

from v1__auth.models import User
from v1__products.utils.scrapper.constants import CATEGORIES

# TODO: комментарии перенести в DOCSTRING


class Preview(models.Model):
    title = models.CharField(max_length=256)  # Заголовок-название цвета
    image = models.ImageField(upload_to='images/')  # Путь к изображению на сервере

    class Meta:
        verbose_name: str = 'Изображение'
        verbose_name_plural: str = 'Изображения'


class Product(models.Model):
    identifier = models.CharField(
        max_length=256,
        primary_key=True,
    )  # 6ти значное ID / Slug поле (зависит от источника). Уникальное в рамках обоих сайтов
    title = models.CharField(max_length=256)  # Заголовок
    full_price = models.DecimalField(max_digits=10, decimal_places=2)  # Цена за упаковку в дробях
    item_price = models.DecimalField(max_digits=10, decimal_places=2)  # Цена в дробях
    package_count = models.IntegerField()
    sizes = models.CharField(max_length=64)
    currency = models.CharField(max_length=3)
    previews = models.ManyToManyField(
        to=Preview,
        related_name='products',
    )  # Продукт, которому принадлежит изображение
    category = models.CharField(max_length=64)
    likes = models.ManyToManyField(to=User, related_name='cart')
    qrcode = models.ImageField(upload_to='qr/')
    created_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name: str = 'Продукт'
        verbose_name_plural: str = 'Продукты'


class CategoryMarkup(models.Model):
    category = models.CharField(
        max_length=32,
        primary_key=True,
        choices=[(key, key) for key in CATEGORIES.keys()],
    )
    markup = models.IntegerField(validators=(validators.MinValueValidator(0),))

    def __str__(self) -> str:
        return f'{self.category} {self.markup}%'


"""
url = 'https://zeydankids.sercdn.com/resimler/b26c066263212ffc15826953bb6a2536.jpg'
response = requests.get(url)
image_data = response.content

product = Product.objects.create(title='А', item_price=44.3, full_price=44.32)
product.save()

preview = Preview(title='Красный', product=product)
preview.image.save('image.jpg', ContentFile(image_data))
preview.save()
product = Product.objects.get(id=1)
print(product.previews.all())
"""
