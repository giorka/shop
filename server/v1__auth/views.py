from django.db.models import QuerySet
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions
from rest_framework.request import Request
from rest_framework.response import Response

from v1__products import models
from v1__products.serializers import CartPreviewSerializer
from . import permissions as custom_permissions
from . import serializers


class UserCreateAPIView(generics.CreateAPIView):
    serializer_class = serializers.UserCreateSerializer


class GoogleUserCreateAPIView(generics.CreateAPIView):
    serializer_class = serializers.GoogleUserCreateSerializer


class ChangePasswordAPIView(generics.CreateAPIView):
    serializer_class = serializers.ChangePasswordSerializer
    permission_classes = [
        permissions.IsAuthenticated,
        custom_permissions.IsRegisteredByEmail,
    ]


class CartListCreateAPIView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = CartPreviewSerializer
    model = models.CartPreview

    def get_queryset(self) -> QuerySet:
        return self.request.user.cart.all()

    def get_object(self) -> model:
        validated_data = self.get_serializer().validate(self.request.data)

        preview = models.Preview.objects.get(identifier=validated_data['preview'])

        if cart_preview := models.CartPreview.objects.filter(preview=preview).first():
            cart_preview.count += int(validated_data['count'])
            cart_preview.save()

            return cart_preview

        return models.CartPreview.objects.create(
            preview=preview,
            count=validated_data['count']
        )

    def create(self, request: Request, *args, **kwargs) -> Response:
        obj = self.get_object()
        request.user.cart.add(obj)

        return Response(data=self.serializer_class(obj).data, status=201)


class CartDestroyAPIView(generics.DestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = serializers.ProductSerializer
    lookup_field = 'identifier'

    def get_queryset(self) -> QuerySet:
        return self.request.user.cart.all()

    def destroy(self, request, *args, **kwargs) -> Response:
        request.user.cart.remove(self.get_object())

        return Response(status=204)
