import json

from django.db.models import QuerySet
from django.utils import timezone
from rest_framework import generics

from . import models, paginations, serializers


class ProductListAPIView(generics.ListAPIView):
    serializer_class = serializers.ProductSerializer
    pagination_class = paginations.ProductPagination
    model = serializer_class.Meta.model
    queryset = models.Product.objects.all()
    filterset_fields = ['category']

    def get_queryset(self) -> QuerySet:
        is_new: bool | None = json.loads(self.request.query_params.get('isNew', 'null'))

        if is_new is None:
            return self.model.objects.all()

        ten_days_ago = timezone.now() - timezone.timedelta(days=10)

        if is_new is True:
            return self.model.objects.filter(created_at__gte=ten_days_ago)
        else:
            return self.model.objects.filter(created_at__lte=ten_days_ago)


class ProductRetrieveAPIView(generics.RetrieveAPIView):
    serializer_class = serializers.ProductSerializer
    model = serializer_class.Meta.model
    queryset = models.Product.objects.all()
