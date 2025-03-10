from datetime import datetime, timedelta, timezone

from . import models
from .converter import Value, ValuesEnum

from rest_framework import serializers


class PreviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Preview
        exclude = ['id', 'title', 'product']


class FullPreviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Preview
        exclude = ['id', 'title']


class ProductSerializer(serializers.ModelSerializer):
    previews = PreviewSerializer(many=True)
    prices = serializers.SerializerMethodField()
    is_new = serializers.SerializerMethodField()

    class Meta:
        model = models.Product
        exclude = ('full_price', 'item_price', 'created_at')

    @staticmethod
    def get_price(price: int | float, currency: str) -> dict[str, int | float]:
        return {
            value: Value(number=float(price), currency=currency)[value] for value in [enum.value for enum in ValuesEnum]
        }

    @staticmethod
    def markup(prices: dict[str, int | float], category: str) -> dict[str, int | float]:
        markup_queryset = models.CategoryMarkup.objects.filter(category=category)

        if markup_queryset.exists():
            markup: models.CategoryMarkup | None = markup_queryset.first()
        else:
            return prices

        prices = prices.copy()

        for key, price in prices.items():
            prices[key] = (price / 100) * markup.markup

        return prices

    @classmethod
    def get_prices(cls, obj: models.Product) -> dict[str, dict]:
        prices_map = cls.markup({'full_price': obj.full_price, 'item_price': obj.item_price}, category=obj.category)

        return {text: cls.get_price(price=price, currency=obj.currency) for text, price in prices_map.items()}

    @staticmethod
    def get_is_new(obj: models.Product) -> bool:
        ten_days_ago = datetime.now().replace(tzinfo=timezone.utc) - timedelta(days=10)

        return obj.created_at > ten_days_ago


class CartProductSerializer(ProductSerializer):
    previews = is_new = None

    class Meta:
        model = models.Product
        exclude = ('full_price', 'item_price', 'created_at', 'title', 'sizes', 'currency', 'qrcode', 'category')


class CartPreviewSerializer(serializers.ModelSerializer):
    preview = PreviewSerializer()
    product = CartProductSerializer(read_only=True)

    class Meta:
        model = models.CartPreview
        exclude = ['id', 'likes']

    def to_representation(self, *args, **kwargs):
        representation = super().to_representation(*args, **kwargs)
        representation |= representation['preview']
        del representation['preview']

        return representation


class OrderSerializer(serializers.ModelSerializer):
    content = CartPreviewSerializer(many=True)

    class Meta:
        model = models.Order
        fields = [
            'content',
        ]


class RetrieveOrderSerializer(serializers.ModelSerializer):
    content = PreviewSerializer(many=True)

    class Meta:
        model = models.Order
        fields = [
            'content',
        ]
