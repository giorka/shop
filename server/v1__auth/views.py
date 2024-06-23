from django.db.models import QuerySet
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions
from rest_framework.request import Request
from rest_framework.response import Response

from . import serializers


class UserCreateAPIView(generics.CreateAPIView):
    serializer_class = serializers.UserCreateSerializer


class GoogleUserCreateAPIView(generics.CreateAPIView):
    serializer_class = serializers.GoogleUserCreateSerializer


class CartListCreateAPIView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = serializers.ProductSerializer
    model = serializer_class.Meta.model

    def get_queryset(self) -> QuerySet:
        return self.request.user.cart.all()

    def get_object(self) -> serializers.ProductSerializer.Meta.model:
        validated_data = self.get_serializer().validate(self.request.data)

        return get_object_or_404(self.model, identifier=validated_data['identifier'])

    def create(self, request: Request, *args, **kwargs) -> Response:
        request.user.cart.add(self.get_object())

        return Response(data=self.serializer_class(self.get_object()).data, status=201)


class CartDestroyAPIView(generics.DestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = serializers.ProductSerializer
    lookup_field = 'identifier'

    def get_queryset(self) -> QuerySet:
        return self.request.user.cart.all()

    def destroy(self, request, *args, **kwargs) -> Response:
        request.user.cart.remove(self.get_object())

        return Response(status=204)
