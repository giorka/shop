from django.contrib.auth.models import AbstractUser
from django.db import models


class Product(models.Model):
    identifier = models.CharField(
        max_length=256
    )  # 6ти значное ID / Slug поле (зависит от источника). Уникальное в рамках обоих сайтов
    title = models.CharField(max_length=64)  # Заголовок
    full_price = models.DecimalField(max_digits=10, decimal_places=2)  # Цена за упаковку в дробях
    item_price = models.DecimalField(max_digits=10, decimal_places=2)  # Цена в дробях

    class Meta:
        verbose_name: str = 'продукт'
        verbose_name_plural: str = 'продукты'


class Preview(models.Model):
    title = models.CharField(max_length=64)  # Заголовок-название цвета
    image = models.ImageField(upload_to='images/')  # Путь к изображению на сервере
    product = models.ForeignKey(
        to=Product,
        on_delete=models.CASCADE,
        related_name='previews'
    )  # Продукт, которому принадлежит изображение

    class Meta:
        verbose_name: str = 'изображение'
        verbose_name_plural: str = 'изображения'


class User(AbstractUser):
    products = models.ManyToManyField(
        to=Product,
        related_name='interests'
    )  # Пользовательская тележка с продуктами

    class Meta:
        verbose_name: str = 'пользователь'
        verbose_name_plural: str = 'пользователи'


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
