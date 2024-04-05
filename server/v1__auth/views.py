from typing import Type

from django.db.models import Model
from rest_framework import generics

from . import serializers


class UserCreateAPIView(generics.CreateAPIView):
    serializer_class: Type[serializers.UserCreateAPIViewSerializer] = serializers.UserCreateAPIViewSerializer
    model: Type[Model] = serializer_class.Meta.model
