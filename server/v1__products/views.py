import json

from usecases import send_about_order

from . import models, paginations, serializers

from django.db.models import QuerySet
from django.utils import timezone
from rest_framework import generics, permissions
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class ProductListAPIView(generics.ListAPIView):
    serializer_class = serializers.ProductSerializer
    model = serializer_class.Meta.model
    queryset = models.Product.objects.all()

    @property
    def pagination_class(self) -> type[PageNumberPagination] | None:
        if 'no_pagination' in self.request.query_params:
            return None

        return paginations.ProductPagination

    def get_queryset(self) -> QuerySet:
        category: str | None = self.request.query_params.get('category')

        if not category:
            queryset = self.model.objects.all()
        else:
            queryset = self.model.objects.filter(category=category)

        is_new: bool | None = json.loads(self.request.query_params.get('isNew', 'null'))

        if is_new is None:
            return queryset

        ten_days_ago = timezone.now() - timezone.timedelta(days=10)

        if is_new is True:
            return queryset.filter(created_at__gte=ten_days_ago)
        else:
            return queryset.filter(created_at__lte=ten_days_ago)


class ProductRetrieveAPIView(generics.RetrieveAPIView):
    serializer_class = serializers.ProductSerializer
    model = serializer_class.Meta.model
    queryset = models.Product.objects.all()


class OrderListCreateAPIView(generics.ListAPIView):
    serializer_class = serializers.OrderSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def post(self, request) -> Response:
        order = models.Order()
        order.user = request.user
        order.save()
        cart_previews = request.user.cart.all()
        previews = [cart_preview.preview for cart_preview in cart_previews]
        order.content.add(*previews)

        request.user.cart.clear()

        send_about_order(
            email=request.user.email,
            id_count={cart_preview.preview.identifier: cart_preview.count for cart_preview in cart_previews},
        )

        return Response(data=serializers.RetrieveOrderSerializer(order).data, status=201)

    def get_queryset(self) -> QuerySet:
        return models.Order.objects.filter(user=self.request.user)
