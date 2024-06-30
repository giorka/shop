from django.contrib import admin

from . import models


@admin.register(models.User)
class UserAdmin(admin.ModelAdmin):
    fields = ['email', 'last_login']
    readonly_fields = ['email', 'last_login']
