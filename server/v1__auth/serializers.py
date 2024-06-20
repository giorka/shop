from django.contrib.auth.password_validation import validate_password
from django.core import validators
from djoser.utils import login_user as login
from rest_framework import serializers

from v1__products import models as v1__products_models
from v1__products import serializers as v1__products_serializers

from . import models


class UserCreateSerializer(serializers.ModelSerializer):
    auth_token = serializers.CharField(
        max_length=40,
        validators=(validators.MinLengthValidator(6),),
        read_only=True,
    )

    class Meta:
        model = models.User
        write_only_fields = (
            'email',
            'password',
        )
        fields = (
            'auth_token',
            *write_only_fields,
        )
        extra_kwargs: dict[str, dict] = {field: {'write_only': True} for field in write_only_fields}

    @staticmethod
    def validate_password(value: str) -> str:
        validate_password(value)

        return value

    def create(self, validated_data: dict) -> dict:
        user = self.Meta.model(email=validated_data['email'])
        user.set_password(validated_data['password'])
        user.save()

        return validated_data | {'auth_token': login(request=None, user=user)}


class ProductSerializer(serializers.ModelSerializer):
    previews = v1__products_serializers.PreviewSerializer(many=True)

    class Meta:
        model = v1__products_models.Product
        exclude = ('likes',)
        read_only_fields = ('title', 'previews', 'full_price', 'item_price', 'category')
        extra_kwargs: dict[str, dict] = {field: {'read_only': True} for field in read_only_fields}
