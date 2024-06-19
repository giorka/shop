from rest_framework import serializers

from . import models


class PreviewModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Preview
        exclude = ('id', 'title')


class ProductModelSerializer(serializers.ModelSerializer):
    previews = PreviewModelSerializer(many=True)

    class Meta:
        model = models.Product
        fields = '__all__'
