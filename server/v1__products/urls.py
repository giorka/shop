from django.urls import path
from django.views.decorators.cache import cache_page

from . import views

urlpatterns = [
    path('', cache_page(6 * (60 * 60))(views.ProductListAPIView.as_view())),
]
