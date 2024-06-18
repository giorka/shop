from django.db import models


# TODO: комментарии перенести в DOCSTRING


class Preview(models.Model):
    title = models.CharField(max_length=64)  # Заголовок-название цвета
    image = models.ImageField(upload_to='images/')  # Путь к изображению на сервере

    class Meta:
        verbose_name: str = 'Изображение'
        verbose_name_plural: str = 'Изображения'


class Product(models.Model):
    identifier = models.CharField(
        max_length=256,
        primary_key=True
    )  # 6ти значное ID / Slug поле (зависит от источника). Уникальное в рамках обоих сайтов
    title = models.CharField(max_length=256)  # Заголовок
    full_price = models.DecimalField(max_digits=10, decimal_places=2)  # Цена за упаковку в дробях
    item_price = models.DecimalField(max_digits=10, decimal_places=2)  # Цена в дробях
    previews = models.ForeignKey(
        to=Preview,
        on_delete=models.CASCADE,
        related_name='product'
    )  # Продукт, которому принадлежит изображение

    class Meta:
        verbose_name: str = 'Продукт'
        verbose_name_plural: str = 'Продукты'


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
