from rest_framework import generics, permissions
from rest_framework.request import Request

from . import serializers


class UserCreateAPIView(generics.CreateAPIView):
    serializer_class = serializers.UserCreateSerializer


# class CartListCreateAPIView(generics.ListCreateAPIView):
#     permission_classes = (permissions.IsAuthenticated,)
#
#     def create(self, request: Request, *args, **kwargs):
#         request.user.cart
