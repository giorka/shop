import json

from django.db.models import QuerySet
from django.utils import timezone
from rest_framework import exceptions, generics
from rest_framework.response import Response
from rest_framework.views import APIView

from . import models, paginations, serializers


class ProductListAPIView(generics.ListAPIView):
    serializer_class = serializers.ProductSerializer
    pagination_class = paginations.ProductPagination
    model = serializer_class.Meta.model
    queryset = models.Product.objects.all()

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


class OrderCreateAPIView(APIView):
    @staticmethod
    def post(request) -> Response:
        if hasattr(request.user, 'order'):
            raise exceptions.ValidationError('Заказ уже существует.')

        order = models.Order(user=request.user)
        order.save()
        order.content.add(*request.user.cart.all())

        request.user.cart.clear()

        return Response(status=201)
