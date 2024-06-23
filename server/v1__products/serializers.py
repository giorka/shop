from rest_framework import serializers

from . import models


class PreviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Preview
        exclude = ('id', 'title')


class ProductSerializer(serializers.ModelSerializer):
    previews = PreviewSerializer(many=True)

    class Meta:
        model = models.Product
        fields = '__all__'
