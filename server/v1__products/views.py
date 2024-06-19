from django.db.models import QuerySet
from rest_framework import generics

from . import models, serializers


class ProductListAPIView(generics.ListAPIView):
    serializer_class = serializers.ProductModelSerializer

    def get_queryset(self) -> QuerySet:
        target = self.request.query_params.get('target')

        if target:
            queryset = models.Product.objects.filter(category=target)
        else:
            queryset = models.Product.objects.all()

        return queryset
