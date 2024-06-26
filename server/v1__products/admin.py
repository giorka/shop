from django.contrib import admin

from . import models


@admin.register(models.CategoryMarkup)
class CategoryMarkupAdmin(admin.ModelAdmin): ...
