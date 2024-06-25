from _decimal import Decimal

from rest_framework import serializers

from . import models
from .utils.converter import Value, ValuesEnum


class PreviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Preview
        exclude = ('id', 'title')


class ProductSerializer(serializers.ModelSerializer):
    previews = PreviewSerializer(many=True)
    prices = serializers.SerializerMethodField()

    class Meta:
        model = models.Product
        exclude = ('full_price', 'item_price', 'likes')

    @staticmethod
    def get_price_dict(price: Decimal, currency: str) -> dict[str, int | float]:
        return {
            value: Value(number=float(price), currency=currency)[value] for value in [enum.value for enum in ValuesEnum]
        }

    @classmethod
    def get_prices(cls, obj: models.Product) -> dict[str, dict]:
        prices_map = {'full_price': obj.full_price, 'item_price': obj.item_price}

        return {text: cls.get_price_dict(price=price, currency=obj.currency) for text, price in prices_map.items()}
