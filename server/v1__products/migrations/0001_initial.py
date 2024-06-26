# Generated by Django 5.0.6 on 2024-06-26 11:57

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Preview',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=256)),
                ('image', models.ImageField(upload_to='images/')),
            ],
            options={
                'verbose_name': 'Изображение',
                'verbose_name_plural': 'Изображения',
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('identifier', models.CharField(max_length=256, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=256)),
                ('full_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('item_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('category', models.CharField(max_length=64)),
                ('likes', models.ManyToManyField(related_name='cart', to=settings.AUTH_USER_MODEL)),
                ('previews', models.ManyToManyField(related_name='products', to='v1__products.preview')),
            ],
            options={
                'verbose_name': 'Продукт',
                'verbose_name_plural': 'Продукты',
            },
        ),
    ]
