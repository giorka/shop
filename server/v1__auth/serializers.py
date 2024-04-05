from typing import Dict, Tuple

from django.contrib.auth.models import AbstractUser
from django.core import validators
from djoser.utils import login_user as login
from rest_framework import serializers

from . import models


class UserCreateAPIViewSerializer(serializers.ModelSerializer):
    auth_token: serializers.CharField = serializers.CharField(
        max_length=40,
        validators=(
            validators.MinLengthValidator(6),
        ),
        read_only=True
    )

    class Meta:
        model: AbstractUser = models.User
        model_fields: Tuple[str] = (
            'email',
            'password',
        )
        serializer_fields: Tuple[str] = (
            'auth_token',

        )
        fields: Tuple[str] = model_fields + serializer_fields
        extra_kwargs: Dict[str, Dict[str, bool]] = {
            model_field: dict(write_only=True) for model_field in model_fields
        }

    def create(self, validated_data: dict) -> dict:
        user: AbstractUser = self.Meta.model(email=validated_data['email'])
        user.set_password(raw_password=validated_data['password'])
        user.save()

        auth_token: str = login(request=None, user=user)

        return dict(auth_token=auth_token)
