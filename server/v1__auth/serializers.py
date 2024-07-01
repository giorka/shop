from django.contrib.auth.models import AbstractUser
from django.contrib.auth.password_validation import validate_password
from django.core import validators
from djoser.utils import login_user as login
from rest_framework import exceptions, serializers
from social_core.backends.google import GoogleOAuth2
from social_core.exceptions import AuthFailed
from social_django.utils import load_strategy

from v1__products import models as v1__products_models
from v1__products import serializers as v1__products_serializers

from . import models, utils

google = GoogleOAuth2(load_strategy())


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


class GoogleUserCreateSerializer(serializers.Serializer):
    google_token = serializers.CharField(
        max_length=216,
        validators=(validators.MinLengthValidator(216),),
        write_only=True,
    )
    auth_token = serializers.CharField(
        max_length=40,
        validators=(validators.MinLengthValidator(6),),
        read_only=True,
    )

    class Meta:
        model = models.User

    def create(self, validated_data: dict) -> dict:
        try:
            email = google.user_data(validated_data['google_token'])['email']
        except AuthFailed:
            raise exceptions.ValidationError('Ключ недействителен.')

        users_with_same_email = self.Meta.model.objects.filter(email=email)

        if users_with_same_email.exists():
            user = users_with_same_email.first()
        else:
            user = self.Meta.model(email=email)
            user.save()

        return validated_data | {'auth_token': login(request=None, user=user)}


class ChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(validators=(validate_password,))
    new_password = serializers.CharField(validators=(validate_password,))

    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)
        self._user: AbstractUser | None = None

    def validate_password(self, value: str) -> str:
        self._user: AbstractUser = self.context['request'].user

        if not self._user.check_password(raw_password=value):
            raise exceptions.ValidationError('The password is incorrect.')

        return value

    def save(self, **kwargs) -> None:
        utils.cp(self._user, new_password=self.validated_data['new_password'])


class ProductSerializer(serializers.ModelSerializer):
    previews = v1__products_serializers.PreviewSerializer(many=True)

    class Meta:
        model = v1__products_models.Product
        exclude = ('likes',)
        read_only_fields = ('title', 'previews', 'full_price', 'item_price', 'category')
        extra_kwargs: dict[str, dict] = {field: {'read_only': True} for field in read_only_fields}
